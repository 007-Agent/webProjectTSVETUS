import React, { useState, useEffect } from 'react'

import axios from 'axios'
// Импортируем Text компонент
import styles from './styles'
import { Question } from '../PrimaryExamination/Elements/Text/Question'

export const DoctorExamination = props => {
  const [currentComponent, setCurrentComponent] = useState(null)
  const [result, setResult] = useState(false)
  const [data2, setData] = useState(props.data)
  const data = props.data
  console.log(data, 'SECONDCHECK')

  // useEffect(() => {
  //   // Выберите тип компонента, который вы хотите отобразить по умолчанию
  //   handleShowComponent('complaints'); // Например, отображаем "Жалобы" по умолчанию
  // }, []);

  // Получаем срез вопросов

  const handleChange = event => {
    console.log(event, 'propsEVENT')
    const index = event.index
    if (index >= 0) {
      // объект со всеми вопросами
      console.log(data2, 'DATA#1')
      data2[index] = event.value
      // выбираем нужный вопрос и добавляем туда данные, точнее изменяем их, у нас в data[0] храниться data, id, name , мы вставляем то же самое, то есть изменяем!
      console.log(data2[index], 'INDEX')
      console.log(data2, 'DATA#222')
      setData(data2)
      setResult(true)
    }
  }
  console.log(data2, 'MAIN CHECK')

  const handleClickSave = () => {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: data2
      })
      .then(response => {
        console.log(response.data)
      })
  }
  let content = (
    <div>
      {data2.map((v, index) => {
        const originalIndex = index // Рассчитываем оригинальный индекс
        return v.id !== null ? (
          <Question
            key={v.data.id}
            v={v}
            index={originalIndex}
            onChange={handleChange} // Передаем оригинальный индекс
          />
        ) : (
          <div style={styles.text__content} key={index}>{`${v.name}:`}</div>
        )
      })}
    </div>
  )

  return (
    <div style={styles.primaryMain}>
      <div style={styles.buttonForm}></div>
      {content}

      <button onClick={handleClickSave} style={styles.button__save}>
        Сохранить
      </button>
    </div>
  )
}
