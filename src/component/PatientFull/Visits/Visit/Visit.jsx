import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { strDate, cutTime, merge, TButton, TIcon } from 'tinput'

import Edit from './Edit'
import axios from 'axios'
import styles from './styles.js'

const Visit = props => {
  console.log(props.visit, 'VZVZVZ')
  const VisitDocId = props.visit.visitDocId
  // const VisitDocId = 122
  console.log(props.visit.visitDocId, 'VisitDocId')
  const visit = props.visit.date
  const roomer = props.visit.room
  const id = props.patient.id
  const [show, setShow] = useState(false)
  console.log(props.visit.room, 'prvisrom')

  console.log(props.patient, 'GGGGG')
  // const style = merge(styles, props.style)

  // let cs = style.container
  // if (props.visit.active) {
  //   cs = merge(cs, style.active)
  // } else {
  //   cs = merge(cs, style.expired)
  // }
  // const handleClickConsole = () => {
  //   console.log(roomer)
  // }

  // const handleDownloadFile = async () => {
  //   try {
  //     // const response = await axios.get(
  //   'https://profiweb.kdpmc.ru:8443/rest/hist/document?id=5768472&format=pdf',
  //     //   {},
  //     //   {
  //     //     responseType: 'blob'
  //     //   }
  //     // )
  //       const response = await axios.get(
  //       'http://127.0.0.1/rest/hist/document?id=5768472&format=pdf',
  //       {},
  //       {
  //         responseType: 'blob'
  //       }
  //     )

  //     const blob = response.data // уже Blob
  //     const url = URL.createObjectURL(blob)

  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = 'document.pdf'
  //     link.click()

  //     URL.revokeObjectURL(url)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const handleDownloadFile22 = async () => {
    try {
      const response = await axios.get(
        `/rest/hist/document?id=${props.visit.visitDocId}&format=rtf`,
        {
          responseType: 'blob'
        }
      )
      console.log(response.data, 'data')
      const blob = response.data // уже Blob
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'document.rtf'
      link.click()

      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  // const handleDownloadFile22 = async () => {
  //   try {
  //     const response = await axios.get(
  //       '/rest/hist/document?id=5768472&format=rtf',

  //       {
  //         responseType: 'blob'
  //       }
  //     )
  //     console.log(response.data, 'data')
  //     const blob = response.data // уже Blob
  //     const url = URL.createObjectURL(blob)

  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = 'document.rtf'
  //     link.click()

  //     URL.revokeObjectURL(url)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const onShow = () => {
    setShow(true)
  }

  const room = props.visit.room ? (
    <div style={styles.room}>(Кабинет: {props.visit.room})</div>
  ) : null
  const doctor = props.visit.doctorName ? (
    <h2 style={styles.doctor}>(Врач : {props.visit.doctorName})</h2>
  ) : null
  const cancel = props.visit.active ? (
    <TButton style={styles.cancel} onClick={onShow}>
      Отменить запись
    </TButton>
  ) : null

  const [result, setResult] = useState({
    visit,
    roomer,
    id
  })
  console.log(result, 'RSLT')

  const edit = props.visit.active ? (
    <Edit
      show={show}
      visit={props.visit}
      patient={props.patient}
      onClose={onClose}
    />
  ) : null

  return (
    <div key={props.index} style={styles.container}>
      <div style={styles.box}>
        <div style={styles.date}>{strDate(props.visit.date)}</div>
        <div style={styles.time}>{cutTime(props.visit.time)}</div>
        <div style={styles.doctor}>{props.visit.resourceName}</div>
        <div style={styles.speciality}>{props.visit.specialityName}</div>

        {room}
        {doctor}
      </div>
      {cancel}
      {edit}
      <div style={styles.row}>
        {VisitDocId ? (
          <TIcon
            style={styles.icon}
            name={'save'}
            timeout={7000}
            onClick={handleDownloadFile22}
          />
        ) : (
          ''
        )}
      </div>
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
