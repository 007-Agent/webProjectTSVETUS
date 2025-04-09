import React, { useState, useEffect } from 'react'

import { MdClear } from 'react-icons/md'
import axios from 'axios'
import styles from './styles.js'
import { DiaryEntry } from '../../MedicChange/DiaryEntry/DiaryEntry'
import { DoctorExamination } from '../../MedicChange/DoctorCheck/DoctorExamination'
import { PrimaryCheck } from '../../MedicChange/PrimaryExamination/PrimaryCheck'
import { TemperatureSheet } from '../../MedicChange/TemperatureSheet/TemperatureSheet'
import Info from '../../hosp/HospList/HospFull/Info/Info.jsx'
const PROJECT = 'hosp'
function MedicForms(props) {
  // const PrimaryExamination = () => <div>Содержимое первичного осмотра</div>;
  // const DoctorExamination = () => <div>Содержимое осмотра лечащим врачом</div>;
  // const TemperatureSheet = () => <div>Содержимое температурного листа</div>;
  console.log(props.id)
  console.log(props.name)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedComponent, setSelectedComponent] = useState(null)
  const id = props.id
  const [info, setInfo] = useState({})

  // Функция для обновления данных
  const refresh = async () => {
    const query = { hospId: id }
    console.log(query, 'QUERYYYYY')

    try {
      const response = await axios.post('/rest/hosp/full', query)
      setInfo(response.data.data)
      setIsLoading(true) // Предполагаем, что данные находятся в response.data
    } catch (err) {
      console.error('Ошибка при выполнении запроса:', err)
    }
  }
  const handleMenuShow = event => {
    setIndex(event.target.value) // Сохраняем индекс выбранного элемента
    handleClick(event.target.value)
  }

  const handleClick = index => {
    if (index === '1') {
      setSelectedComponent(
        <PrimaryCheck
          project={PROJECT}
          user={props.user}
          data={info.inspection}
          name={'inspection'}
        />
      )
    } else if (index === '2') {
      setSelectedComponent(<DoctorExamination project={PROJECT} />)
    } else if (index === '3') {
      setSelectedComponent(
        <TemperatureSheet
          project={PROJECT}
          user={props.user}
          data={info.temperature}
          name={'temperature'}
        />
      )
    } else if (index === '4') {
      setSelectedComponent(
        <DiaryEntry
          project={PROJECT}
          user={props.user}
          data={info.records}
          name={'records'}
        />
      )
    } else {
      setSelectedComponent(<div>Выберите тип медицинской формы</div>)
    }
  }

  useEffect(() => {
    if (id) {
      refresh()
    } else {
      console.error('ID не найден')
    }
  }, [id]) // Зависимость от id, чтобы выполнять запрос при его изменении

  console.log(info, 'infooooo')

  return (
    <>
      <div style={styles.main__form}>
        <div style={styles.list__medform}>
          {isLoading ? (
            <select
              name='selectedFruit'
              style={styles.select__type}
              onChange={handleMenuShow}>
              <option value='0'>-</option>
              <option value='1'>Первичный осмотр</option>
              <option value='2'>Осмотр врачом</option>
              <option value='3'>Температурный лист</option>
              <option value='4'>Дневниковые записи</option>
            </select>
          ) : (
            <div style={styles.outline__info}>
              Загружаем информацию о пациенте...
            </div>
          )}
          <MdClear style={styles.icon} onClick={props.onClose} />
        </div>
       {isLoading && <Info info={info}/>}
        {isLoading && selectedComponent}
      </div>
    </>
  )
}

export default MedicForms
