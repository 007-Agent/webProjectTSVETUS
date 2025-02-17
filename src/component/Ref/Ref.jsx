import React from 'react'
import PropTypes from 'prop-types'

import { TListBox, merge, post } from 'tinput'

import styles from './styles.js'

const REF_URL_META = '/rest/meta/results' //это URL-адреса для получения данных о справочниках.
const REF_URL_TABLE = '/rest/pol/ref' // это URL-адреса для получения данных о справочниках.
const EMPTY = { id: -1, order: -1, code: -1, name: '-' } // это объект, представляющий пустое значение для списка.

const REFS = {} // объект для хранения данных о справочниках и их коллбеках.

const getRef = props => {
  // получает или создает объект для хранения данных о справочниках и коллбеках для конкретного ключа.
  const key = props.id || props.table || 'def'
  if (!(key in REFS)) REFS[key] = { callbacks: new Set() }
  return REFS[key]
}

const updateList = component => {
  // console.log(component, 'COMPONENTTTTT')
  // обновляет список элементов. Если элементы уже загружены, они устанавливаются в состояние компонента. Если нет, отправляется HTTP-запрос для получения данных.
  const ref = getRef(component.props)
  if (ref.items) component.setState({ items: ref.items })
  else {
    if (ref.callbacks.size === 0) {
      let params = {}
      if (component.props.id) {
        // пустые данные, то выполняем запрос для получения списка пунктов!
        params = {
          url: REF_URL_META,
          data: { id: component.props.id } // у кажого пациента(id) есть внутри data.id = ..., по которому мы получаем список пунктов для клика на вопрос.
        }
      } else if (component.props.table) {
        params = {
          url: REF_URL_TABLE,
          data: { table: component.props.table }
        }
      }
      // console.log(component.props.id, 'id')
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
    // определяет, нужно ли обновлять компонент, основываясь на изменениях в props и state
    return (
      this.props.value !== nextProps.value ||
      this.state.items !== nextState.items
    )
  }

  handleChange(event) {
    console.log(event, 'EVENT')
    // обрабатывает изменения в списке и вызывает переданный коллбек onChange, если он есть.
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  updateRef(items) {
    // обновляет состояние items, если компонент все еще смонтирован.
    if (this.mounted) this.setState({ items })
    // console.log(items, 'ITEEEMS') // рендерим пункты для клика, точнее список вариантов. Массив в котром лежат все списки для вопросников!
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
