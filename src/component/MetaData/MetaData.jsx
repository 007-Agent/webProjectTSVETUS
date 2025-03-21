import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, merge, clone, post } from 'tinput'

import Meta from 'component/Meta'

import styles from './styles.js'

class MetaData extends React.PureComponent {
  //  Первчиный осмотр))
  constructor(props) {
    super(props) // передали data={info.inspection}
    this.data = props.data // передали в data = info.inspection
    this.state = { data: clone(props.data), show: props.show }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.notify = this.notify.bind(this)
    this.change = this.change.bind(this)
    this.check = this.check.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(old) {
    if (this.props.nested && this.props.data !== old.data) {
      this.setState({ data: this.props.data })
    }
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        save: save,
        cancel: cancel
      })
    }
  }

  change(data) {
    // Обновляет родительский компонент с новыми данными.
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        value: data
      })
    }
  }

  cancel() {
    // Возвращает состояние данных к исходным значениям и уведомляет об этом
    this.setState({ data: clone(this.data) }, () => {
      this.notify()
    })
  }

  save() {
    post({
      url: `/rest/${this.props.project}/${this.props.name}/update`, // сохраняет внесённые данные о осмотре пациента
      data: { data: this.state.data },
      sender: this,
      success: data => {
        this.data = clone(data)
        this.setState({ data: clone(data) }, () => {
          this.notify()
        })
      }
    })
  }

  check(event) {
    if (event.data && event.data.code && this.props.type) {
      // console.log(this.props.type, event.data.code)
      let arr = event.data.code.toLowerCase().split('.')
      // console.log(arr) // массив данных
      if (arr.indexOf('pnd') >= 0) {
        if (['pnd', 'pndmob'].indexOf(this.props.type) < 0) {
          return false
        }
      }
    }

    return true
  }

  handleChange(event) {
    // получаем наш вопрос, точнее и его индекс в цикле map()

    console.log(event, 'EVENTMETADATA')

    let index = event.index // у каждого вопроса в цикле есть индекс по порядку!
    if (index >= 0) {
      let data = clone(this.state.data) // клонируем нужный вопрос из списка вопросов info.inspection
      data[index] = event.value // изменяем data.list на новый data.list с выбранными пунками или данными
      this.setState({ data: data }, () => {
        if (this.props.nested) {
          this.change(data)
        } else {
          this.notify(this.save, this.cancel)
        }
      })
    }
  }

  handleShow() {
    this.setState({ show: true })
    // console.log(this.data) // массив данных
    // console.log(this.state.data)
  }

  handleHide() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const style = merge(styles, this.props.style)

    const ms = {
      component: style.component,
      memo: style.memo,
      list: style.list,
      text: style.text
    }
    console.log(this.data, 'DATAAAAAA INTERSNO') // у каждого пациента, есть свой ID вопросов
    const content = this.state.data ? ( // если есть data то .....
      this.state.show ? ( // если state.show === true то.....
        this.state.data.map((v, i) => {
          // console.log(v, 'v') // передаём каждый элемент вопроса в массиве
          return this.check(v) ? (
            <Meta
              key={i}
              index={i} // передаём индекс по пордяку каждого вопроса по циклу
              style={ms}
              value={v} // передаём объект с данными и проходимя по ним по порядку)
              onChange={this.handleChange}
            />
          ) : null
        })
      ) : (
        <div style={style.show}>...</div>
      )
    ) : null

    const gs = this.props.nested
      ? merge(style.group, style.nested)
      : style.group

    return (
      <TGroup // отображает весь контент на карте пациента
        style={gs}
        label={this.props.caption}
        onClick={this.handleShow}
        onLabel={this.handleHide}>
        {content}
      </TGroup>
    )
  }
}

MetaData.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  caption: PropTypes.string,
  type: PropTypes.oneOf(['pnd', 'pndmob', 'osmp', 'osmpmob', 'hosp']),
  nested: PropTypes.any,
  show: PropTypes.any
}

MetaData.defaultProps = {
  project: 'help',
  show: true
}

export default MetaData
