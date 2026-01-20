// import React, { useState } from 'react'
// import style from './style.js'
// export default function Techniques(props) {
//   const [list, setLit] = useState([])
//   const [Startdate, setStartDate] = useState('')
//   const [EndDate, setEndDate] = useState('')
//   const patient = props.patient

//   const handleDateList = () => {}

//   const handleStartDateChange = event => {
//     setStartDate(event.target.value)
//   }

//   const handleEndDateChange = event => {
//     setEndDate(event.target.value)
//   }
//   const handleClickShowList = () => {
//     const obj = {
//       OneDate: Startdate,
//       SecondDate: EndDate,
//       patient: patient.id
//     }
//     console.log(obj, 'GGGED')
//   }
//   console.log(EndDate)
//   console.log(Startdate)

//   return (
//     <div>
//       <div style={style.main_content}>
//         <h2 style={style.textTitile}>Введите дату нужного приёма врачей</h2>
//         <div style={style.contentDate}>
//           <label htmlFor='С' style={style.label}>
//             С
//             <input
//               type='date'
//               onChange={handleDateList}
//               style={style.buttonDate}
//               onClick={handleStartDateChange}
//             />
//           </label>
//           <label htmlFor='По' style={style.label}>
//             По
//             <input
//               type='date'
//               style={style.buttonDate}
//               onChange={handleEndDateChange}
//             />
//           </label>
//           <button onClick={handleClickShowList} style={style.ButtonConfirm}>
//             Показать
//           </button>
//         </div>
//         <div>
//           <ul></ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// import React, { useState } from 'react'
// import style from './style.js'
// const Techniques = props => {
//   const patient = props.patient
//   // Создаем один стейт-объект для всех полей
//   const [formData, setFormData] = useState({
//     startDate: '',
//     endDate: '',
//     patient: patient.id
//   })

//   // Универсальный обработчик изменений
//   const handleInputChange = event => {
//     const { name, value } = event.target
//     // Обновляем только нужное поле в стейте
//     setFormData({
//       ...formData, // Копируем предыдущие значения
//       [name]: value // Обновляем одно поле по его имени
//     })
//   }

//   const handleSubmit = async event => {
//     event.preventDefault()
//     console.log('Отправляемые данные:', formData)

//     // Отправляем formData на сервер (код fetch как в примере выше)
//     // await sendToServer(formData);
//   }

//   return (
//     <div>
//       <div style={style.main_content}>
//         <h2 style={style.textTitile}>Введите дату нужного приёма врачей</h2>
//         <div style={style.contentDate}>
//           <label htmlFor='С' style={style.label}>
//             С
//             <input
//               type='date'
//               style={style.buttonDate}
//               name='startDate' // Важно: атрибут name должен совпадать с ключом в formData
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label htmlFor='По' style={style.label}>
//             По
//             <input
//               type='date'
//               style={style.buttonDate}
//               name='endDate'
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <button onClick={handleSubmit} style={style.ButtonConfirm}>
//             Показать
//           </button>
//         </div>
//         <div>
//           <ul></ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Techniques
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { TLoad, merge } from 'tinput'

import Visit from '../Visits/Visit/Visit.jsx'

import styles from './style.js'

const Techniques = ({ patient, specialities, user, style }) => {
  const [items, setItems] = useState([])
  console.log(items, 'UTUT')
  const [wait, setWait] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 25
  const isMounted = useRef(true)
  console.log(patient, 'BBBVBVB')
  const fetchVisits = () => {
    const patientId = patient?.id || 0
    console.log(patientId, 'EERRRE')
    if (patientId > 0) {
      setWait(true)
      axios
        .post('/api/visit/list', { patientId })
        .then(response => {
          if (isMounted.current) {
            console.log(response.data.data, 'RDRDRD')
            setItems(response.data.data)
            setWait(false)
            setCurrentPage(1) // при загрузке сбрасываем страницу на первую
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setWait(false)
          }
        })
    }
  }

  useEffect(() => {
    isMounted.current = true
    fetchVisits()
    return () => {
      isMounted.current = false
    }
  }, [patient]) // при изменении patient перезагружаем визиты

  const combinedStyle = merge(styles, style)

  const visitItems = items
    .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
    .map((v, i) => (
      <Visit
        key={i}
        style={combinedStyle.visit}
        patient={patient}
        visit={v}
        onRefresh={fetchVisits}
      />
    ))

  const totalPages = Math.ceil(items.length / clientsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div>
      <div style={styles.visit_content}>{visitItems}</div>

      <div style={styles.button_content}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={styles.button}>
          ← Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          style={styles.button}
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}>
          Следующая →
        </button>
      </div>
      <TLoad show={wait} />
    </div>
  )
}

export default Techniques
