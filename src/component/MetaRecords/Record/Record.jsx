import React from 'react'
import PropTypes from 'prop-types'

import {
  merge,
  clone,
  post,
  strDate,
  cutTime,
  toObj,
  TMemo,
  TDate,
  TTime
} from 'tinput'

import styles from './styles.js'

class Record extends React.PureComponent {
  constructor(props) {
    super(props)
    this.value = props.value
    this.state = { value: clone(props.value) }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getObj = this.getObj.bind(this)
    this.getKey = this.getKey.bind(this)
    this.getText = this.getText.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getObj() {
    return toObj(this.state.value?.data?.list?.[0]?.name) || {}
  }

  getKey() {
    return this.state.value?.data?.list?.[0]?.key
  }

  getText() {
    const obj = this.getObj()
    const text = obj?.text
    return text && text.length ? text : null
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.getKey(),
        save: save,
        cancel: cancel
      })
    }
  }

  delete() {
    if (this.props.onDelete) {
      this.props.onDelete({ key: this.getKey() })
    }
  }

  cancel() {
    this.setState({ value: clone(this.value) }, () => {
      this.notify()
      const text = this.getText()
      if (!text || text.trim() === '') this.delete()
    })
  }

  save() {
    const value = clone(this.state.value)
    if (!this.getText()) value.data.list[0].name = null
    post({
      url: `/rest/${this.props.project}/${this.props.name}/update`,
      data: { data: [value] },
      sender: this,
      success: data => {
        this.value = clone(data[0])
        this.setState({ value: clone(this.value) }, () => {
          this.notify()
          const text = this.getText()
          if (!text || text.trim() === '') this.delete()
        })
      }
    })
  }

  handleChange(event) {
    const value = clone(this.state.value)
    const obj = toObj(value.data.list[0].name) || {}
    if ('text' === event.name) {
      obj.text = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('date' === event.name) {
      obj.date = strDate(event.value)
      value.data.list[0].name = JSON.stringify(obj)
      value.data.list[0].date = event.value
    } else if ('time' === event.name) {
      obj.time = cutTime(event.value)
      value.data.list[0].name = JSON.stringify(obj)
      value.data.list[0].time = event.value
    }
    this.setState({ value }, () => {
      this.notify(this.save, this.cancel)
    })
  }

  render() {
    const style = merge(styles, this.props.style)

    const obj = this.getObj()

    const text = this.getText()

    return (
      <div style={style.container}>
        <div style={style.row}>
          <div style={style.left}>
            <TDate
              style={style.date}
              name={'date'}
              value={obj.date}
              onChange={this.handleChange}
            />
            <TTime
              style={style.time}
              name={'time'}
              value={obj.time}
              onChange={this.handleChange}
            />
          </div>
          <div style={style.user}>{obj.user?.name}</div>
        </div>
        <TMemo
          style={style.memo}
          name={'text'}
          value={obj.text}
          autoSize={true}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Record.getEmpty = function ({ current, user = {} }) {
  const obj = {
    type: 'record',
    user: { id: user.id, name: user.name },
    date: strDate(current),
    time: cutTime(current),
    text: ''
  }
  return JSON.stringify(obj)
}

Record.propTypes = {
  style: PropTypes.object,
  value: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

Record.defaultProps = {
  project: 'hosp'
}

export default Record
