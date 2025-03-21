import React from 'react'
import PropTypes from 'prop-types'

import { merge, strDate, TIcon } from 'tinput'

import styles from './styles.js'

class PatientShort extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick({
        patient: this.props.patient,
        index: this.props.index
      })
    }
    console.log(this.props.patient, 'PATIENTS')
  }
  handleRemove() {
    if (this.props.onRemove) {
      this.props.onRemove({
        patient: this.props.patient,
        index: this.props.index
      })
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let head = null

    if (this.props.patient) {
      head = this.props.office ? (
        <div style={style.head.container}>
          <div style={style.head.nib}>{this.props.patient.nib}</div>
          <div style={style.head.ych.office}>{this.props.patient.ych}</div>
          <div style={style.head.button}>
            <TIcon
              style={style.head.button.icon}
              name={'close'}
              onClick={this.handleRemove}
            />
          </div>
        </div>
      ) : (
        <div style={style.head.container}>
          <div style={style.head.nib}>{this.props.patient.nib}</div>
          <div style={style.head.ych.rest}>{this.props.patient.ych}</div>
        </div>
      )

      return (
        <div style={style.container} onClick={this.handleClick}>
          {head}
          <div style={style.fio}>{this.props.patient.fio}</div>
          <div style={style.age}>
            {strDate(this.props.patient.birthday) +
              ' (' +
              this.props.patient.age +
              ')'}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

PatientShort.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number.isRequired,
  patient: PropTypes.object.isRequired,
  office: PropTypes.any,
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

export default PatientShort
