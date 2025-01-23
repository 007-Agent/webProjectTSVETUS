import React from 'react'
import PropTypes from 'prop-types'

import Department from 'component/Department'
import Person from 'component/Person'
import Ref from 'component/Ref'

import {
  TForm,
  TDate,
  TTime,
  merge,
  post,
  isoDate,
  compare,
  clone
} from 'tinput'

import styles from './styles.js'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: Edit.empty,
      wait: false,
      error: null,
      message: null
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidUpdate(old) {
    if (!compare(old.query, this.props.query)) {
      let query = merge(Edit.empty, this.props.query)
      this.setState({ query: query })
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  update(event) {
    let query = this.state.query
    if (event.button === 'add') {
      query.id = 0
    }
    post({
      url: '/rest/schedule/update',
      data: { query: query },
      sender: this,
      success: interval => {
        this.props.onClose({
          ...event,
          interval: interval,
          query: clone(this.state.query)
        })
      }
    })
  }

  delete(event) {
    post({
      url: '/rest/schedule/delete',
      data: { query: { id: this.state.query.id } },
      sender: this,
      success: () => {
        this.props.onClose({
          ...event,
          query: clone(this.state.query)
        })
      }
    })
  }

  handleClose(event) {
    if (event.button === 'edit' || event.button === 'add') {
      this.update(event)
    } else if (event.button == 'delete') {
      this.delete(event)
    } else if (event.button == 'continue') {
      this.setState({ error: null, message: null })
    } else {
      this.props.onClose(event)
    }
  }

  handleChange(event) {
    let query = {
      ...clone(this.state.query),
      [event.name]: event.value
    }
    this.setState({ query: query })
  }

  render() {
    let style = merge(styles, this.props.style)

    let buttons = null
    if (this.state.query.id > 0) {
      buttons = {
        delete: 'Удалить',
        add: 'Добавить',
        edit: 'Изменить',
        cancel: 'Отмена'
      }
    } else {
      buttons = {
        cancel: 'Отмена',
        add: 'Добавить'
      }
    }

    return (
      <TForm
        style={style.container}
        name={'editor'}
        show={this.props.query}
        buttons={buttons}
        error={this.state.error}
        errorButtons={{ continue: 'Продолжить' }}
        message={this.state.message}
        messageButtons={{ ok: 'Ok' }}
        caption={'Редактировать интервал'}
        wait={this.state.wait}
        onClose={this.handleClose}>
        <div style={style.top}>
          <Ref
            style={style.type}
            value={this.state.query.type}
            name={'type'}
            label={'Тип:'}
            table={'ref_hshedtyp'}
            onChange={this.handleChange}
          />
        </div>

        <div style={style.times}>
          <TTime
            style={style.timeFrom}
            value={this.state.query.from}
            name={'from'}
            label={'С:'}
            onChange={this.handleChange}
          />

          <TTime
            style={style.timeTo}
            value={this.state.query.to}
            name={'to'}
            label={'ПО:'}
            onChange={this.handleChange}
          />
        </div>

        <div style={style.times}>
          <TDate
            style={style.date}
            value={this.state.query.date}
            name={'date'}
            label={'Дата:'}
            calendar={true}
            navigators={'month'}
            start={1}
            onChange={this.handleChange}
          />

          <Ref
            style={style.crew}
            value={this.state.query.crewId}
            name={'crewId'}
            label={'Бригада:'}
            table={'ref_crew'}
            onChange={this.handleChange}
          />
        </div>

        <div style={style.refs}>
          <Department
            style={style.department}
            value={this.state.query.departmentId}
            name={'departmentId'}
            label={'Отделение:'}
            layout={'top'}
            showIcon={false}
            onChange={this.handleChange}
          />

          <Person
            style={style.person}
            value={this.state.query.personId}
            depId={this.state.query.departmentId}
            name={'personId'}
            label={'Сотрудник:'}
            layout={'top'}
            showIcon={false}
            onChange={this.handleChange}
          />
        </div>
      </TForm>
    )
  }
}

Edit.propTypes = {
  onClose: PropTypes.func.isRequired,
  query: PropTypes.object
}

Edit.empty = {
  id: null,
  date: isoDate(new Date()),
  from: '08:00:00',
  to: '08:00:00',
  crewId: null,
  departmentId: null,
  personId: null
}

export default Edit
