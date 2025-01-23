import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { strDate, cutTime, merge, TButton } from 'tinput'

import Edit from './Edit'

import styles from './styles.js'

const Visit = props => {
  const [show, setShow] = useState(false)

  const style = merge(styles, props.style)

  let cs = style.container
  if (props.visit.active) {
    cs = merge(cs, style.active)
  } else {
    cs = merge(cs, style.expired)
  }

  const onClose = event => {
    setShow(false)
    if (event.refresh && props.onRefresh) props.onRefresh()
  }

  const onShow = () => {
    setShow(true)
  }

  const room = props.visit.room ? (
    <div style={style.room}>(Кабинет: {props.visit.room})</div>
  ) : null

  const cancel = props.visit.active ? (
    <TButton style={style.cancel} onClick={onShow}>
      Отменить запись
    </TButton>
  ) : null

  const edit = props.visit.active ? (
    <Edit
      show={show}
      visit={props.visit}
      patient={props.patient}
      onClose={onClose}
    />
  ) : null

  return (
    <div key={props.index} style={cs}>
      <div style={style.box}>
        <div style={style.date}>{strDate(props.visit.date)}</div>
        <div style={style.time}>{cutTime(props.visit.time)}</div>
        <div style={style.doctor}>{props.visit.resourceName}</div>
        <div style={style.speciality}>{props.visit.specialityName}</div>
        {room}
      </div>
      {cancel}
      {edit}
    </div>
  )
}

Visit.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number,
  visit: PropTypes.object,
  patient: PropTypes.object,
  onRefresh: PropTypes.func
}

export default Visit
