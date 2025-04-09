import React, { useState, useEffect } from 'react'

import axios from 'axios'
// Импортируем Text компонент
import styles from './styles'
import { Question } from './Elements/Text/Question'

export const PrimaryCheck = props => {
  const [currentComponent, setCurrentComponent] = useState(null)

  const [data2, setData] = useState(props.data)
  const data = props.data

  // useEffect(() => {
  //   // Выберите тип компонента, который вы хотите отобразить по умолчанию
  //   handleShowComponent('complaints'); // Например, отображаем "Жалобы" по умолчанию
  // }, []);

  const handleShowComponent = componentType => {
    let questions
    let startIndex
    let endIndex

    switch (componentType) {
      case 'complaints':
        startIndex = 0
        endIndex = 10
        break
      case 'medicalHistory':
        startIndex = 10
        endIndex = 25
        break
      case 'generalHistory':
        startIndex = 25
        endIndex = 84
        break
      case 'resultHistory':
        startIndex = 85
        endIndex = 89
        break
      default:
        questions = []
        return
    }

    // Получаем срез вопросов
    questions = data.slice(startIndex, endIndex)
    setCurrentComponent(
      <div>
        {questions.map((v, index) => {
          const originalIndex = startIndex + index // Рассчитываем оригинальный индекс
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
  }

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
    // .then((response) => {
    //   const clonedData = clone(response.data.data); // Клонируем данные из ответа
    //   setData(clonedData); // Обновляем состояние
    //   // Вызываем уведомление после обновления состояния
    //   console.log(response.data.data, "RESUUULT"); // Логируем результат
    // })
    // .catch((error) => {
    //   console.error("There was an error updating the data!", error); // Обработка ошибок
    // });
  }

  return (
    <div style={styles.primaryMain}>
      <div style={styles.buttonForm}>
        <button
          style={styles.button}
          onClick={() => handleShowComponent('complaints')}>
          Жалобы
        </button>
        <button
          style={styles.button}
          onClick={() => handleShowComponent('medicalHistory')}>
          Анамнез заболевания
        </button>
        <button
          style={styles.button}
          onClick={() => handleShowComponent('generalHistory')}>
          Физик. исследования
        </button>
        <button
          style={styles.button}
          onClick={() => handleShowComponent('resultHistory')}>
          Заключительный осмотр
        </button>
      </div>
      <div style={styles.primaryContent}>{currentComponent}</div>
      <button onClick={handleClickSave} style={styles.button__save}>
        Сохранить
      </button>
    </div>
  )
}
