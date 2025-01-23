import React from 'react'
import PropTypes from 'prop-types'

import { TText, TMemo, TCheck, merge, clone, compare } from 'tinput'

import Ref from 'component/Ref'
import List from 'component/List'
import Phrase from 'component/Phrase'

import styles from './styles.js'

const META_REF = 1
const META_STR = 4
const META_STD = 5
const META_TXT = 6
const META_MLT = 7
const META_CHK = 8
const META_MTX = 9

class Meta extends React.Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.handleRefChange = this.handleRefChange.bind(this)
    this.handleListChange = this.handleListChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleChkChange = this.handleChkChange.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  change(value) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        index: this.props.index,
        value: value
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !compare(this.props.value, nextProps.value)
  }

  handleRefChange(event) {
    if (this.props.onChange) {
      let value = clone(this.props.value)
      value.data.list = []
      if (event.item) {
        value.data.list.push(event.item)
      }
      this.change(value)
    }
  }

  handleListChange(event) {
    if (this.props.onChange) {
      let value = clone(this.props.value)
      value.data.list = event.value.slice()
      this.change(value)
    }
  }

  handleTextChange(event) {
    if (this.props.onChange) {
      let value = clone(this.props.value)
      value.data.list = []
      if (event.value && event.value.trim() !== '') {
        value.data.list.push({ id: null, order: 0, name: event.value })
      }
      this.change(value)
    }
  }

  handleChkChange(event) {
    if (this.props.onChange) {
      let value = clone(this.props.value)
      value.data.list = []
      if (event.value && event.value == 1) {
        value.data.list.push({ id: null, order: 0, name: event.value })
      }
      this.change(value)
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let content = null

    if (this.props.value && this.props.value.data) {
      let data = this.props.value.data
      let label = data.name
      if (data.type === META_REF) {
        let value = null
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].id
        }
        content = (
          <Ref
            style={style.component}
            id={data.id}
            label={label}
            value={value}
            placeholder={'-'}
            onChange={this.handleRefChange}
          />
        )
      } else if (data.type === META_MLT) {
        let value = data.list
        content = (
          <List
            style={style.list}
            id={data.id}
            label={label}
            value={value}
            onChange={this.handleListChange}
          />
        )
      } else if (data.type === META_STR) {
        let value = null
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].name
        }
        content = (
          <TText
            style={style.component}
            value={value}
            label={label}
            placeholder={'*'}
            onChange={this.handleTextChange}
          />
        )
      } else if (data.type === META_TXT) {
        let value = null
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].name
        }
        content = (
          <TMemo
            style={style.memo}
            value={value}
            label={label}
            autoSize={true}
            onChange={this.handleTextChange}
          />
        )
      } else if (data.type === META_CHK) {
        let v = null
        if (data.list.length > 0 && data.list[0]) {
          v = data.list[0].name
        }
        let value = 0
        if (v || v == 1) {
          value = 1
        }
        content = (
          <TCheck
            style={style.component}
            value={value}
            label={label}
            valueInt={true}
            onChange={this.handleChkChange}
          />
        )
      } else if (data.type === META_STD) {
        let value = null
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].name
        }
        content = (
          <Phrase
            style={style.memo}
            value={value}
            id={data.id}
            label={label}
            autoSize={true}
            onChange={this.handleTextChange}
          />
        )
      } else if (data.type === META_MTX) {
        let value = null
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].name
        }
        content = (
          <TMemo
            style={style.memo}
            value={value}
            label={label}
            autoSize={true}
            onChange={this.handleTextChange}
          />
        )
      }
    } else {
      let caption = this.props.value ? this.props.value.name : ''
      content = <div style={style.text}>{caption}</div>
    }

    return content
  }
}

Meta.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Meta
