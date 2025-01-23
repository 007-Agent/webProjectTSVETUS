import React from 'react'
import PropTypes from 'prop-types'

import Department from 'component/Department'
import Person from 'component/Person'
import Table from './Table'
import Edit from './Edit'

import {
  TPanel,
  TDate,
  TScroll,
  merge,
  isoDate,
  post,
  clone,
  compare
} from 'tinput'

import styles from './styles.js'

function getFrom(date) {
  let d = new Date(date)
  return isoDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 2))
}

function getTo(date) {
  let d = new Date(date)
  return isoDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + 35))
}

function getDate() {
  return isoDate(new Date())
}

function getQuery(props) {
  let date = new Date()
  return {
    personId: 0,
    departmentId: props.depId,
    from: getFrom(date),
    to: getTo(date),
    sort: null
  }
}

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: getQuery(props),
      date: getDate(),
      current: getDate(),
      wait: false,
      schedule: [],
      editQuery: null
    }
    this.refresh = this.refresh.bind(this)
    this.checkDate = this.checkDate.bind(this)
    this.edit = this.edit.bind(this)
    this.add = this.add.bind(this)
    this.sort = this.sort.bind(this)
    this.reduce = this.reduce.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.timer = setInterval(this.checkDate, 30 * 60 * 1000)
  }

  componentDidMount() {
    this.mounted = true
    this.props.onCaption(this.props.caption)
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
    clearInterval(this.timer)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.depId !== prevProps.depId) {
      this.setState({
        query: getQuery(this.props),
        current: getDate()
      })
    }
    if (!compare(this.state.query, prevState.query)) {
      this.refresh()
    }
    if (this.state.wait !== prevState.wait) {
      this.props.onTools([
        { icon: 'add', onClick: this.add },
        { icon: 'refresh', onClick: this.refresh, rotate: this.state.wait }
      ])
    }
  }

  refresh() {
    post({
      url: '/rest/schedule/calendar',
      data: this.state.query,
      sender: this,
      target: 'schedule'
    })
  }

  checkDate() {
    if (this.state.current !== getDate()) {
      this.setState({
        query: getQuery(this.props),
        current: getDate()
      })
    }
  }

  edit(event) {
    this.setState({ editQuery: event.query })
  }

  add() {
    let query = {
      ...Edit.empty,
      departmentId: this.state.query.departmentId,
      personId: this.state.query.personId,
      type: this.props.type,
      date: this.state.current
    }
    this.setState({ editQuery: query })
  }

  sort(event) {
    let query = clone(this.state.query)
    query.sort = event.date
    this.setState({ query: query })
  }

  handleChange(event) {
    let query = clone(this.state.query)
    let date = this.state.date
    if (event.name === 'date') {
      date = event.value
      query.from = getFrom(date)
      query.to = getTo(date)
    } else {
      query[event.name] = event.value
    }
    this.setState({ query: query, date: date })
  }

  reduce(action, query, interval) {
    let sch = clone(this.state.schedule)
    let row = sch.find(v => {
      return v.person.id === query.personId
    })
    if (row) {
      let day = row.items.find(v => {
        return v.date === query.date
      })
      if (day) {
        if (day.intervals) {
          if (action === 'add') {
            day.intervals.push(interval)
          } else {
            let index = day.intervals.findIndex(v => {
              return v.id === query.id
            })
            if (index >= 0) {
              if (action === 'delete') {
                day.intervals.splice(index, 1)
              } else if (action === 'edit') {
                day.intervals[index] = interval
              }
            }
          }
        } else if (action === 'add') {
          day.intervals[0] = interval
        }
      }
    } else {
      this.refresh()
    }
    this.setState({ schedule: sch })
  }

  handleClose(event) {
    if (event.button === 'add') {
      this.reduce('add', event.query, event.interval)
    } else if (event.button === 'edit') {
      this.reduce('edit', event.query, event.interval)
    } else if (event.button === 'delete') {
      this.reduce('delete', event.query)
    }
    this.setState({ editQuery: null })
  }

  render() {
    let style = merge(styles, this.props.style)

    return (
      <div style={style.container}>
        <TPanel style={style.panel}>
          <TDate
            style={style.date}
            layout={'top'}
            name={'date'}
            label={'Дата:'}
            calendar={true}
            navigators={'month'}
            value={this.state.date}
            format={{ type: 'native' }}
            start={1}
            nestedIcon={true}
            onChange={this.handleChange}
          />

          <Person
            style={style.person}
            layout={'top'}
            name='personId'
            label='Сотрудник:'
            showIcon={false}
            value={this.state.query.personId}
            onChange={this.handleChange}
          />

          <Department
            style={style.department}
            layout={'top'}
            name='departmentId'
            label='Отделение:'
            showIcon={false}
            value={this.state.query.departmentId}
            onChange={this.handleChange}
          />
        </TPanel>

        <TScroll style={style.scroll}>
          <Table
            schedule={this.state.schedule}
            from={this.state.query.from}
            current={this.state.current}
            to={this.state.query.to}
            sort={this.state.query.sort}
            departmentId={this.state.query.departmentId}
            onEdit={this.edit}
            onSort={this.sort}
          />
        </TScroll>

        <Edit query={this.state.editQuery} onClose={this.handleClose} />
      </div>
    )
  }
}

Schedule.propTypes = {
  style: PropTypes.object,
  user: PropTypes.object,
  depId: PropTypes.number,
  type: PropTypes.number.isRequired,
  onTools: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
  onCaption: PropTypes.func.isRequired
}

export default Schedule
