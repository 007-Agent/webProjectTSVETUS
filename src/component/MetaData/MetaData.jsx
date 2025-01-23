import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, merge, clone, post } from 'tinput'

import Meta from 'component/Meta'

import styles from './styles.js'

class MetaData extends React.PureComponent {
  constructor(props) {
    super(props)
    this.data = props.data // info.inspection
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
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        value: data
      })
    }
  }

  cancel() {
    this.setState({ data: clone(this.data) }, () => {
      this.notify()
    })
  }

  save() {
    post({
      url: `/rest/${this.props.project}/${this.props.name}/update`,
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
      let arr = event.data.code.toLowerCase().split('.')
      if (arr.indexOf('pnd') >= 0) {
        if (['pnd', 'pndmob'].indexOf(this.props.type) < 0) {
          return false
        }
      }
    }
    return true
  }

  handleChange(event) {
    // метод изменяющий сосатояние элемента
    let index = event.index
    if (index >= 0) {
      let data = clone(this.state.data) // копируем данные из цикла в массив данных
      data[index] = event.value // меняем значение элемента
      this.setState({ data: data }, () => {
        if (this.props.nested) {
          // После обновления состояния метод проверяет, есть ли свойство nested в props компонента.
          this.change(data) // если есть, то обновляем данные в компоненте
        } else {
          this.notify(this.save, this.cancel) //
        }
      })
    }
  }

  handleShow() {
    this.setState({ show: true }) // можно показать или скрыть элемент
  }

  handleHide() {
    this.setState({ show: !this.state.show }) // скрывать или не скрывать элемент)
  }

  render() {
    const style = merge(styles, this.props.style)

    const ms = {
      component: style.component,
      memo: style.memo,
      list: style.list,
      text: style.text
    }

    const content = this.state.data ? ( // проверяет наличие данных, если они есть, то нужноли их отоброжать. Если нет, то показывает пустой список
      this.state.show ? ( // Если показываем элемент то выводим элементы
        this.state.data.map((v, i) => {
          return this.check(v) ? ( // передаём элемент в функцию проверки
            <Meta
              key={i}
              index={i} // индекс элемента в массиве данных
              style={ms}
              value={v} // значение элемента
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
      <TGroup // рендерит элементы
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
