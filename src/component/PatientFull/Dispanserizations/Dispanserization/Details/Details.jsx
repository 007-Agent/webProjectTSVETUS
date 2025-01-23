import React from 'react'
import PropTypes from 'prop-types'

import {
  TTable,
  TGroup,
  TFlexList,
  strDate,
  cutTime,
  merge,
  post
} from 'tinput'

import styles from './styles.js'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      event: 'event '
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
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
    const speciality = event.item.speciality
    const completeDate = strDate(event.item.completeDate)
    const services = event.item.services
    return (
      <div key={event.index} index={event.index} style={event.style.frame}>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Специальность: '}</div>
          <div style={event.style.value}>{speciality}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Дата: '}</div>
          <div style={event.style.value}>{completeDate}</div>
        </div>
        <div style={event.style.col}>
          <div style={event.style.field}>{'Услуги: '}</div>
          <div style={event.style.value}>{services}</div>
        </div>
      </div>
    )
  }

  render() {
    let style = merge(styles, this.props.style)
    return (
      <TFlexList
        style={style.list}
        columns={{
          speciality: {
            caption: 'Специальность',
            width: '1fr',
            value: v => v
          },
          completeDate: {
            caption: 'Дата',
            width: '1fr',
            value: v => strDate(v)
          },
          services: {
            caption: 'Услуги',
            width: '1fr',
            value: v => v
          }
        }}
        options={{ showSelected: false }}
        items={this.props.details}
        onFrame={this.onFrame}
      />
    )
  }
}

Details.propTypes = {
  style: PropTypes.object,
  details: PropTypes.array
}

export default Details
