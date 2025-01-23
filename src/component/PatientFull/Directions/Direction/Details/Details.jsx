import React from 'react'
import PropTypes from 'prop-types'

import { TFlexList, strDate, merge, post } from 'tinput'

import styles from './styles.js'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      event: 'event '
    }
    this.getDetail = this.getDetail.bind(this)
    this.click = this.click.bind(this)
    this.change = this.change.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getDetail() {
    post({
      url: '/api/office/patient/directiondetails',
      data: {
        id: this.props.patientId
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

  click(event) {
    this.setState({
      event: console.log(
        JSON.stringify(
          'eventClick ' + event.item.completedate + ' ' + event.item
        )
      )
    })
  }

  change(event) {
    this.setState({
      event:
        this.state.event +
        console.log(
          JSON.stringify('event ' + event.item.completedate + ' ' + event.item)
        )
    })
  }

  onFrame(event) {
    const department = event.item.department
    const directionDate = strDate(event.item.directionDate)
    const code = event.item.code
    const name = event.item.name
    const preparation = event.item.preparation
    const maxDate = strDate(event.item.maxDate)
    return (
      <div
        key={event.index}
        index={event.index}
        style={event.style.frame}
        onClick={event.onClick}>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Дата создания:'}</div>
          <div style={event.style.value}>{directionDate}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Направляется в:'}</div>
          <div style={event.style.value}>{department}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Код услуги:'}</div>
          <div style={event.style.value}>{code}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Название услуги:'}</div>
          <div style={event.style.value}>{name}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Подготовка:'}</div>
          <div style={event.style.value}>{preparation}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Срок действия:'}</div>
          <div style={event.style.value}>{maxDate}</div>
        </div>
      </div>
    )
  }

  render() {
    let style = merge(styles, this.props.style)
    return (
      <div key={1} style={style.container}>
        <TFlexList
          style={style.list}
          name={'myGrid'}
          columns={{
            directionDate: {
              caption: 'Дата создания',
              width: '2fr',
              value: v => strDate(v)
            },
            department: {
              caption: 'Направляется в ',
              width: '2fr',
              value: v => v
            },
            code: {
              caption: 'Код услуги ',
              width: '2fr',
              value: v => v
            },
            name: {
              caption: 'Название услуги ',
              width: '2fr',
              value: v => v
            },
            preparation: {
              caption: 'Подготовка ',
              width: '2fr',
              value: v => v
            },
            maxDate: {
              caption: 'Срок действия',
              width: '2fr',
              value: v => strDate(v)
            }
          }}
          items={this.props.direction.services}
          options={{ showSelected: false }}
          onFrame={this.onFrame}
          onClick={this.click}
          onChange={this.change}
        />
      </div>
    )
  }
}

Details.propTypes = {
  style: PropTypes.object,
  direction: PropTypes.object
}

export default Details
