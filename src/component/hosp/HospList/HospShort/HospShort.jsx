import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.js'

import { merge, strDate, cutDate } from 'tinput'

const HospShort = props => {
  // простая наычальная карта с главными данными о пациенте!
  const info = props.info || {}
  const state = info.state

  const onClick = () => {
    props.onClick({ index: props.index })
  }

  const style = merge(styles, props.style)

  const containerStyle =
    1 === state
      ? merge(style.container, style.first)
      : 3 === state
      ? merge(style.container, style.last)
      : style.container

  let dateIn = new Date(info.dateIn)
  let dateOut = new Date(info.to)

  if (info.fio) {
    return (
      <div style={containerStyle} onClick={onClick}>
        <div style={style.ward}>{info.ward}</div>
        <div style={style.patient}>
          <div style={style.nib}>{info.nib}</div>
          <div style={style.fio}>{info.fio}</div>
        </div>
        <div style={style.age}>{info.age}</div>
        <div style={style.stay}>
          Пребывание с {cutDate(dateIn)} по {strDate(dateOut)}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

HospShort.propTypes = {
  style: PropTypes.object,
  info: PropTypes.object
}

HospShort.defaultProps = {
  info: {}
}

export default HospShort
