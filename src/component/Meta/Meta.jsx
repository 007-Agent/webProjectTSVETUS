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
  //  Показывает карточку пациента первичный осмотр! по порядку проходимся по объектам v = props.value. И для каждого объекта свой тип вопроса) Простыми словами показывает вопрос нужный по порядку
  constructor(props) {
    super(props) // в пропсы передали value={v}(this.props.value)
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
    // передаём нужный объект вопроса с новыми данными data.list
    // Обновляет родительский компонент с новыми данными.
    console.log(value, 'VALUEMETA')
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
    // передаёт выбранный элемент, то есть по которому кликнули!
    if (this.props.onChange) {
      // если функция передана через пропсы то...
      let value = clone(this.props.value)
      value.data.list = []
      if (event.item) {
        value.data.list.push(event.item)
      }
      this.change(value)
      // console.log(value.data.list, 'hLIIIST')
    }
  }

  handleListChange(event) {
    // массив с выбранными пунктами передаем, value содержит объекты с выбранными пунктами

    if (this.props.onChange) {
      // если функция передана через пропсы то...

      let value = clone(this.props.value) // клонируем один вопрос нужный с данными если они там есть уже
      value.data.list = event.value.slice()

      this.change(value)
    }
  }

  handleTextChange(event) {
    // Метод handleTextChange в коде компонента Meta отвечает за обработку изменений, происходящих в текстовом поле
    if (this.props.onChange) {
      // если функция передана через пропсы то...
      let value = clone(this.props.value)
      console.log(value.data.list, 'VALUE DATA LIST')
      value.data.list = []
      if (event.value && event.value.trim() !== '') {
        value.data.list.push({ id: null, order: 0, name: event.value })
      }
      // console.log(data.type, 'data-type')
      this.change(value)
    }
  }

  handleChkChange(event) {
    // если функция передана через пропсы то...
    if (this.props.onChange) {
      let value = clone(this.props.value)
      value.data.list = []
      if (event.value && event.value == 1) {
        // если не пустое...
        value.data.list.push({ id: null, order: 0, name: event.value })
      }
      this.change(value) // передаём в функцию введённые данные
    }
  }

  render() {
    let style = merge(styles, this.props.style)
    console.log(this.props.value, 'vvvvvvvvvv') // список всех вопросов для пациента
    let content = null

    if (this.props.value && this.props.value.data) {
      // есть да)
      let data = this.props.value.data // передаём свойство data в массиве value)
      console.log(data, 'DATA-2') // data - объект, в котором пристутсвует вопрос, id вопроса и тд
      let label = data.name // цикл идёт map.value...
      if (data.type === META_REF) {
        // Если тип данных META_REF, отображается компонент Ref.
        // проходимся по кажому объекут и прояверяем чеау равно data.type....
        let value = null // Идёт цикл простыми словами, проходимся по кажому объекту с вопросами
        if (data.list.length > 0 && data.list[0]) {
          value = data.list[0].id
        }
        content = (
          <Ref
            style={style.component}
            id={data.id} // код вопроса
            label={label} // например Анамнез заболевания)
            value={value} // пустое свойство, либо не пустое, если уже ответ дали
            placeholder={'-'}
            onChange={this.handleRefChange}
          />
        )
      } else if (data.type === META_MLT) {
        // Если тип данных META_MLT, отображается компонент List.
        let value = data.list
        content = (
          <List
            style={style.list}
            id={data.id} // id=8352
            label={label} // по порядку идут данные this.props.value
            value={value} //пустой массив
            onChange={this.handleListChange}
          />
        )
      } else if (data.type === META_STR) {
        // Если тип данных META_STR, отображается текстовое поле TText.
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
