import React from 'react'
import PropTypes from 'prop-types'
import { strDate, cutDate, merge } from 'tinput'

import Details from './Details'

import styles from './styles.js'

class Dispanserization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const style = merge(styles, this.props.style)

    const dateReg = strDate(this.props.dispanserization.dateReg) || ''
    const datePlan = strDate(this.props.dispanserization.datePlan) || ''
    const period = `${cutDate(
      this.props.dispanserization.dateFrom || ''
    )}-${cutDate(this.props.dispanserization.dateTo || '')}`
    const health = this.props.dispanserization.healthGroup || ''
    const dinamic = `${this.props.dispanserization.dinamic || ''}: ${
      this.props.dispanserization.move || ''
    }`
    const phisGroup = this.props.dispanserization.phisGroup || ''

    const details = this.state.show ? (
      <Details details={this.props.dispanserization.details} />
    ) : null

    return (
      <div key={this.props.index} style={style.container}>
        <div style={style.item} onClick={this.click}>
          <div style={style.box}>
            <div style={style.caption}>Дата оформления:</div>
            <div style={style.value}>{dateReg}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Период:</div>
            <div style={style.value}>{period}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Следующяя диспансеризация:</div>
            <div style={style.value}>{datePlan}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Группа здоровья:</div>
            <div style={style.value}>{health}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>
              Гуппа для занятий физической культурой:
            </div>
            <div style={style.value}>{phisGroup}</div>
          </div>
        </div>
        {details}
      </div>
    )
  }
}

Dispanserization.propTypes = {
  style: PropTypes.object,
  dispanserization: PropTypes.object,
  index: PropTypes.number
}

export default Dispanserization
