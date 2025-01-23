import React from 'react'
import PropTypes from 'prop-types'

import { TListBox, merge, post } from 'tinput'

import styles from './styles.js'

const REF_URL_META = '/rest/meta/results' // URL-адреса для получения данных о метаданных и таблицах соответственно.
const REF_URL_TABLE = '/rest/pol/ref'
const EMPTY = { id: -1, order: -1, code: -1, name: '-' }

const REFS = {}

const getRef = props => {
  const key = props.id || props.table || 'def'
  if (!(key in REFS)) REFS[key] = { callbacks: new Set() }
  return REFS[key]
}

const updateList = component => {
  // проверяет, есть ли уже загруженные данные уже или нет
  const ref = getRef(component.props)
  if (ref.items)
    component.setState({ items: ref.items }) // Если данные загружены
  else {
    // Формирует параметры для запроса и отправляет запрос
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
        // вызывавет функцию, которая отправляет запрос на сервер
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
class Ref extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      items: []
    }
    this.updateRef = this.updateRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  render() {
    let style = merge(styles, this.props.style)

    let showIcon = this.props.icon ? true : false

    return (
      <TListBox
        style={style}
        name={this.props.name}
        empty={EMPTY}
        items={this.state.items}
        value={this.props.value}
        placeholder={this.props.placeholder}
        showIcon={showIcon}
        showEdit={this.props.showEdit}
        icon={this.props.icon}
        label={this.props.label}
        caption={this.props.label || this.props.caption}
        modal={this.props.modal}
        chars={this.props.chars}
        keyField={['id', 'key']}
        valueField={['name', 'value']}
        onSearch={this.props.onSearch}
        onChange={this.handleChange}
      />
    )
  }
}

Ref.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  showEdit: PropTypes.any,
  modal: PropTypes.any,
  caption: PropTypes.any,
  table: PropTypes.string,
  chars: PropTypes.number,
  onSearch: PropTypes.func
}

Ref.defaultProps = {
  modal: 10
}

export default Ref
