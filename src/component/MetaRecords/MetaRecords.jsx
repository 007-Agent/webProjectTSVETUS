import React from 'react'
import PropTypes from 'prop-types'

import { merge, clone, TGroup, TIcon, isoDate, isoTime } from 'tinput'

import Record from './Record'
import Temperature from './Temperature'

import styles from './styles.js'

class MetaRecords extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = { show: props.show, data: clone(props.data) }
    this.handleChange = this.handleChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getEmpty = this.getEmpty.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getEmpty({ current }) {
    const user = this.props.user || {}
    const obj =
      'records' === this.props.name
        ? Record.getEmpty({ current, user })
        : 'temperature' === this.props.name
        ? Temperature.getEmpty({ current, user })
        : {}
    return JSON.stringify(obj)
  }

  handleDelete(event) {
    if (event.key) {
      const newData = this.state.data.map(item => {
        if (item.data && item.data.list) {
          const newList = item.data.list.filter(v => v.key !== event.key)
          item.data.list = newList
        }
        return item
      })
      this.setState({ data: newData })
    }
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(event)
  }

  handleAdd() {
    const newData = clone(this.state.data)
    const found = newData.find(v => v.data?.list)
    if (found) {
      const current = new Date()
      const newRecord = {
        key: crypto.randomUUID(),
        name: this.getEmpty({ current, index: found.data.list }),
        date: isoDate(current),
        time: isoTime(current)
      }
      found.data.list = found.data.list.concat(newRecord)
      this.setState({ data: newData })
    }
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleHide() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const style = merge(styles, this.props.style)

    const content = this.state.data
      ? this.state.show
        ? this.state.data.reduce((acc, cur) => {
            if (cur.data && cur.data.list) {
              cur.data.list.forEach(v => {
                const value = clone(cur)
                value.data.list = [v]
                if ('records' === this.props.name) {
                  acc.push(
                    <Record
                      key={v.key}
                      style={style.record}
                      name={this.props.name}
                      project={this.props.project}
                      value={value}
                      user={this.props.user}
                      onChange={this.handleChange}
                      onDelete={this.handleDelete}
                    />
                  )
                } else if ('temperature' === this.props.name) {
                  acc.push(
                    <Temperature
                      key={v.key}
                      style={style.record}
                      name={this.props.name}
                      project={this.props.project}
                      value={value}
                      user={this.props.user}
                      onChange={this.handleChange}
                      onDelete={this.handleDelete}
                    />
                  )
                } else {
                  acc.push(
                    <div>{`Раздел "${this.props.name}" - не поддерживается!`}</div>
                  )
                }
              })
            }
            return acc
          }, [])
        : null
      : null

    const addButton = this.state.show ? (
      <div style={style.add}>
        <TIcon style={style.iconAdd} name={'add'} onClick={this.handleAdd} />
      </div>
    ) : null

    const showButton = this.state.show ? null : (
      <div style={style.show}>...</div>
    )

    return (
      <TGroup
        style={style.group}
        label={this.props.caption}
        onClick={this.handleShow}
        onLabel={this.handleHide}>
        {content}
        {addButton}
        {showButton}
      </TGroup>
    )
  }
}

MetaRecords.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  caption: PropTypes.string,
  show: PropTypes.any,
  user: PropTypes.object
}

MetaRecords.defaultProps = {
  project: 'help',
  show: true
}

export default MetaRecords
