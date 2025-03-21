import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.js'
// import { Link } from 'react-router-dom'
import { merge, strDate, cutDate } from 'tinput'

const infoPatient = props => {
  const style = merge(styles, props.style)
  // простая наычальная карта с главными данными о пациенте!
  const info = props.info || {}
  const state = info.state

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(info.id) // Передаем id в onClick
    }
  }

  let dateIn = new Date(info.dateIn)
  let dateOut = new Date(info.to)

  if (info.fio) {
    return (
      <div onClick={handleClick}>
        <ul style={style.patinetContent}>
          <div>
            <h3 style={style.title}>{info.ward}-21</h3>
            <div style={style.list__fio}>
              <span style={style.span}>{info.nib}</span>
              <h2 style={style.fion_name}>{info.fio}</h2>
            </div>
            <div style={style.age_info}>{info.age}</div>
            <p style={style.date}>
              {' '}
              Пребывание с {cutDate(dateIn)} по {strDate(dateOut)}
            </p>
          </div>
        </ul>
      </div>
    )
  } else {
    return <div></div>
  }
}

infoPatient.propTypes = {
  style: PropTypes.object,
  info: PropTypes.object
}

infoPatient.defaultProps = {
  info: {}
}

export default infoPatient
