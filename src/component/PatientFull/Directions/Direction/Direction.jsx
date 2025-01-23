import React from 'react'
import PropTypes from 'prop-types'
import { merge, strDate, Sizer, download, TIcon } from 'tinput'
import Details from './Details'
import styles from './styles.js'

class Direction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      items: []
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const style = merge(styles, this.props.style)
    const details = this.state.show ? (
      <Details direction={this.props.direction} />
    ) : null

    const date = strDate(this.props.direction.date) || ''
    const doctor = this.props.direction.doctor || ''
    const speciality = this.props.direction.speciality || ''
    const visitReason = this.props.direction.visitReason || ''
    const diagnosisCode = this.props.direction.diagnosisCode || ''

    return (
      <div key={this.props.index} style={style.container} onClick={this.click}>
        <div style={style.item}>
          <div style={style.box}>
            <div style={style.caption}>Дата:</div>
            <div style={style.value}>{date}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Врач - {speciality}:</div>
            <div style={style.value}>{doctor}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Причина обращения:</div>
            <div style={style.value}> {visitReason}</div>
          </div>
          <div style={style.box}>
            <div style={style.caption}>Диагноз:</div>
            <div style={style.value}>{diagnosisCode}</div>
          </div>
        </div>
        <div style={style.detail}>{details}</div>
      </div>
    )
  }
}

Direction.propTypes = {
  style: PropTypes.object,
  direction: PropTypes.object,
  index: PropTypes.number
}

export default Direction
