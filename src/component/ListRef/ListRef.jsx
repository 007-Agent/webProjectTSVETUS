import React from 'react'
import PropTypes from 'prop-types'

import { merge, post } from 'tinput'

import styles from './styles.js'

const REF_URL_META = '/rest/meta/results'
const REF_URL_TABLE = '/rest/pol/ref'
const EMPTY = { id: -1, order: -1, code: -1, name: '-' }

const REFS = {}

const getRef = props => {
  const key = props.id || props.table || 'def'
  if (!(key in REFS)) REFS[key] = { callbacks: new Set() }
  return REFS[key]
}

const updateList = component => {
  const ref = getRef(component.props)
  if (ref.items) component.setState({ items: ref.items })
  else {
    if (ref.callbacks.size === 0) {
      let params = {}
      if (component.props.id) {
        params = {
          url: REF_URL_META,
          data: { id: component.props.id }
        }
      } else if (component.props.table) {
        params = {
          url: REF_URL_TABLE,
          data: { table: component.props.table }
        }
      }
      post({
        ...params,
        success: response => {
          ref.items = response
          ref.callbacks.forEach(v => v(response))
        }
      })
    }
    ref.callbacks.add(component.updateRef)
  }
}

const unlink = component => {
  const ref = getRef(component.props)
  ref.callbacks.delete(component.updateRef)
}

class ListRef extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      items: []
    }
    this.updateRef = this.updateRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.itemClick = this.itemClick.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    updateList(this)
  }

  componentWillUnmount() {
    unlink(this)
    this.mounted = false
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.value !== nextProps.value ||
      this.state.items !== nextState.items
    )
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  updateRef(items) {
    if (this.mounted) this.setState({ items })
  }

  itemClick(index) {
    if (this.props.onChange) {
      const item = this.state.items[index]
      this.props.onChange({
        name: this.props.name,
        data: this.props.data,
        value: item.id,
        item
      })
    }
  }

  render() {
    const style = merge(styles, this.props.style)

    const items = this.state.items?.map((v, i) => (
      <div key={i} style={style.item} onClick={() => this.itemClick(i)}>
        {v.name}
      </div>
    ))

    return <div style={style.container}>{items}</div>
  }
}

ListRef.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  table: PropTypes.string
}

export default ListRef
