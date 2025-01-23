import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { merge, post, strDate, cutTime, TForm, TGroup } from 'tinput'

import styles from './styles'

const Edit = props => {
  const visit = props.visit || {}
  const patient = props.patient || {}
  const show = props.show

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const style = merge(styles, props.style)

  const renderVisit = () => {
    return (
      <React.Fragment>
        <div style={style.row}>
          <div style={style.date}>{strDate(visit.date)}</div>
          <div style={style.time}>{cutTime(visit.from)}</div>
        </div>
        <div style={style.speciality}>{visit.specialityName}</div>
        <div style={style.doctor}>{visit.doctorName}</div>
      </React.Fragment>
    )
  }

  const cancelVisit = () => {
    post({
      url: '/api/visit/clear',
      data: { visitId: visit.id, patientId: patient.id },
      success: () => {
        setMessage('Запись отменена')
      },
      fail: (_status, error) => {
        setError(error.message)
      }
    })
  }

  const onClose = event => {
    if ('ok' === event.button) {
      if (props.onClose) props.onClose({ refresh: true })
    } else if ('continue' === event.button) {
      if (props.onClose) props.onClose()
    } else if ('save' === event.button) {
      cancelVisit()
    } else if ('cancel' === event.button) {
      if (props.onClose) props.onClose()
    }
  }

  useEffect(() => {
    if (show) {
      setMessage(null)
      setError(null)
    }
  }, [show])

  const content = visit ? (
    <div style={style.content}>
      <div style={style.caption}>{'Отменить запись?'}</div>
      <TGroup style={style.group} label={'Пациент'}>
        <div style={style.row}>
          <div style={style.date}>{patient.nib}</div>
          <div style={style.time}>{patient.fio}</div>
        </div>
      </TGroup>
      <TGroup style={style.group} label={'Запись'}>
        {renderVisit()}
      </TGroup>
    </div>
  ) : null

  return (
    <TForm
      style={style.form}
      show={show}
      buttons={{
        save: 'Да',
        cancel: 'Нет'
      }}
      error={error}
      errorButtons={{
        continue: 'Continue'
      }}
      message={message}
      messageButtons={{
        ok: 'Ok'
      }}
      onClose={onClose}>
      {content}
    </TForm>
  )
}

Edit.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  visit: PropTypes.object,
  show: PropTypes.any,
  onClose: PropTypes.func
}

export default Edit
