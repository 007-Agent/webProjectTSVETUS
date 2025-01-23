import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  merge,
  post,
  strDate,
  cutTime,
  TForm,
  TGroup,
  TText,
  TMemo
} from 'tinput'

import styles from './styles'

const BUSY_MESSAGE =
  'Интервал ужа занят! Попробуйте записться на другой интервал.'

const Edit = props => {
  const visitId = props.visitId
  const user = props.user || {}
  const patient = props.patient || {}

  const [visit, setVisit] = useState({})
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [phone, setPhone] = useState(user.phone || '')
  const [fio, setFio] = useState(
    `${user.lastName || ''} ${user.firstName || ''} ${user.middleName || ''}`
  )

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
        <div style={style.branch}>Филиал: {visit.branchName}</div>
      </React.Fragment>
    )
  }

  const renderConf = () => {
    return (
      <div style={style.content}>
        <div style={style.caption}>{'Вы записаны!'}</div>
        <TGroup style={style.group} label={'Пациент'}>
          <div style={style.row}>
            <div style={style.date}>{patient.nib}</div>
            <div style={style.time}>{patient.fio}</div>
          </div>
        </TGroup>
        <TGroup style={style.group} label={'Посещение'}>
          {renderVisit()}
        </TGroup>
      </div>
    )
  }

  const updateVisit = () => {
    post({
      url: '/api/visit/update',
      data: { visitId, patientId: patient.id, phone, fio },
      success: (data, msg) => {
        setVisit(data)
        setMessage(renderConf())
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
      setMessage(null)
      setError(null)
    } else if ('save' === event.button) {
      updateVisit()
    } else if ('cancel' === event.button) {
      if (props.onClose) props.onClose()
    }
  }

  const onChange = event => {
    if ('phone' === event.name) setPhone(event.value)
    else if ('fio' === event.name) setFio(event.value)
  }

  useEffect(() => {
    if (visitId) {
      setMessage(null)
      setError(null)
      post({
        url: '/api/visit/get',
        data: { visitId },
        success: data => {
          setVisit(data)
          if (data.busy) setMessage(BUSY_MESSAGE)
        },
        fail: (_status, error) => {
          setError(error.message)
        }
      })
    } else setVisit({})
  }, [visitId])

  const content = visit ? (
    <div style={style.content}>
      <div style={style.caption}>{'Подтвердите запись'}</div>
      <TGroup style={style.group} label={'Пациент'}>
        <div style={style.row}>
          <div style={style.date}>{patient.nib}</div>
          <div style={style.time}>{patient.fio}</div>
        </div>
      </TGroup>
      <TGroup style={style.group} label={'Посещение'}>
        {renderVisit()}
      </TGroup>
      <TText
        style={style.text}
        name={'phone'}
        value={phone}
        layout={'top'}
        label={'Телефон:'}
        format={{
          mask: '+7 (NNN) NNN-NN-NN',
          empty: '_'
        }}
        onChange={onChange}
      />
      <TMemo
        style={style.text}
        name={'fio'}
        label={'Ф.И.О. представителя:'}
        value={fio}
        onChange={onChange}
      />
    </div>
  ) : null

  return (
    <TForm
      style={style.form}
      show={visitId}
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
  visitId: PropTypes.number,
  user: PropTypes.object,
  patient: PropTypes.object,
  onClose: PropTypes.func
}

export default Edit
