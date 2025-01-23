import React from 'react'
import PropTypes from 'prop-types'

import { TTable, TGroup, TFlexList, strDate, cutTime, merge, post } from 'tinput'

import styles from './styles.js'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.getDetail = this.getDetail.bind(this)
  }
  componentDidMount() {
    this.mounted = true
    this.getDetail()
  }

  componentWillUnmount() {
    this.mounted = false
  }
  getDetail() {
    post({
      url: '/rest/office/patient/diagn',
      data: {
        id: this.props.id
      },
      sender: this,
      target: 'items'
    })
  }

  onCellStyle(event) {
    let style = {}
    if (event.index % 2 > 0) {
      style = merge(style, { backgroundColor: '#d8d7ff' })
    }
    if (typeof event.cell === 'string' && event.cell.indexOf('11') >= 0) {
      style = merge(style, { backgroundColor: '#ffb0b5' })
    }
    return style
  }
  onFrame(event) {
    // let code = event.item.code ? "Код "+event.item.code : "Код";
    // let name = event.item.name ? "Диагноз "+event.item.name : "Диагноз";
    // let from = event.item.from ? "Дата постановки "+strDate(event.item.from) : "Дата постановки";
    // let reg = event.item.reg ? "Дата перерегистрации "+strDate(event.item.reg) : "Дата перерегистрации";
    // let to = event.item.to ? "Дата снятия "+strDate(event.item.to) : "Дата снятия";
    // let healthGroup = event.item.healthGroup ? "Группа "+event.item.healthGroup : "Группа";

    let code = event.item.code ? ' ' + event.item.code : ' '
    let name = event.item.name ? ' ' + event.item.name : ' '
    let from = event.item.from ? ' ' + strDate(event.item.from) : ' '
    let reg = event.item.reg ? ' ' + strDate(event.item.reg) : ' '
    let to = event.item.to ? ' ' + strDate(event.item.to) : ' '

    return (
      <div key={event.index} index={event.index} style={event.style.frame} onClick={event.onClick}>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Код: '}</div>
          <div style={event.style.value}>{code}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Диагноз: '}</div>
          <div style={event.style.value}>{name}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Дата постановки: '}</div>
          <div style={event.style.value}>{from}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Дата перерегистрации: '}</div>
          <div style={event.style.value}>{reg}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Дата снятия: '}</div>
          <div style={event.style.value}>{to}</div>
        </div>
      </div>
    )
  }

  render() {
    let style = merge(styles, this.props.style)

    return (
      <div key={1} style={style.container}>
        <div style={style.diag}>Диагноз:</div>

        <TFlexList
          style={style.list}
          name={'myGrid'}
          columns={{
            code: {
              caption: 'Код',
              width: '1fr'
            },
            name: {
              caption: 'Диагноз',
              width: '2fr'
            },
            from: {
              caption: 'Дата постановки',
              width: '2fr',
              value: v => {
                return strDate(v)
              }
            },
            reg: {
              caption: 'Дата перерегистрации',
              width: '2fr',
              value: v => {
                return strDate(v)
              }
            },
            to: {
              caption: 'Дата снятия',
              width: '2fr',
              value: v => {
                return strDate(v)
              }
            }
          }}
          items={this.state.items}
          onFrame={this.onFrame}
        />
      </div>
    )
  }
}

Detail.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number,
  detail: PropTypes.object
}

export default Detail
