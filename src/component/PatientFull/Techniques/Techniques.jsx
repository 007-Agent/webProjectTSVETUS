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

import React, { useState } from 'react'
import style from './style.js'
const Techniques = props => {
  const patient = props.patient
  // Создаем один стейт-объект для всех полей
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    patient: patient.id
  })

  // Универсальный обработчик изменений
  const handleInputChange = event => {
    const { name, value } = event.target
    // Обновляем только нужное поле в стейте
    setFormData({
      ...formData, // Копируем предыдущие значения
      [name]: value // Обновляем одно поле по его имени
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('Отправляемые данные:', formData)

    // Отправляем formData на сервер (код fetch как в примере выше)
    // await sendToServer(formData);
  }

  return (
    <div>
      <div style={style.main_content}>
        <h2 style={style.textTitile}>Введите дату нужного приёма врачей</h2>
        <div style={style.contentDate}>
          <label htmlFor='С' style={style.label}>
            С
            <input
              type='date'
              style={style.buttonDate}
              name='startDate' // Важно: атрибут name должен совпадать с ключом в formData
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label htmlFor='По' style={style.label}>
            По
            <input
              type='date'
              style={style.buttonDate}
              name='endDate'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <button onClick={handleSubmit} style={style.ButtonConfirm}>
            Показать
          </button>
        </div>
        <div>
          <ul></ul>
        </div>
      </div>
    </div>
  )
}

export default Techniques
