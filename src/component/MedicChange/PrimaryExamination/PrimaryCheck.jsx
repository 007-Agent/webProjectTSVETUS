import React, { useState, useEffect } from 'react'
import { BiPrinter } from 'react-icons/bi'
import axios from 'axios'
import { download } from 'tinput'
// Импортируем Text компонент
import styles from './styles'
import { Question } from './Elements/Text/Question'
import { FaArrowAltCircleUp } from 'react-icons/fa'
export const PrimaryCheck = props => {
  const [currentComponent, setCurrentComponent] = useState(null)
  const [result, setResult] = useState(false)
  const [data2, setData] = useState(props.data)
  const [save, setSave] = useState(false)
  const data = props.data
  const id = props.id
  const newID = 33165
  const repCoding = 'stat.card.sancur'
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
        endIndex = 7
        break
      case 'medicalHistory':
        startIndex = 8
        endIndex = 22
        break
      case 'generalHistory':
        startIndex = 23
        endIndex = 73
        break
      case 'resultHistory':
        startIndex = 74
        endIndex = 79
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

  const clickHandlePrinter = async () => {
    const url = '/rest/hosp/statcard'

    try {
      const response = await axios.post(url, {
        id,
        repCode: 'stat.card.sancur'
      })
      console.log(response.data.data, 'ответ от сервера')
      if (response.status === 200) {
        let base64Data = response.data.data

        if (typeof base64Data !== 'string') {
          console.error('Полученные данные не являются строкой:', base64Data)
          return
        }

        base64Data = base64Data.replace(/-/g, '+').replace(/_/g, '/')

        const padding = base64Data.length % 4
        if (padding) {
          base64Data += '='.repeat(4 - padding)
        }

        const byteCharacters = atob(base64Data)
        const byteNumbers = new Uint8Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const blob = new Blob([byteNumbers], { type: 'application/pdf' })

        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', 'stat_card.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Ошибка при получении файла:', error)
    }
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
      setResult(true)
    }
  }
  console.log(data2, 'MAIN CHECK')

  const handleScrollClick = () => {
    window.scrollTo({ top: 110, left: 110, behavior: 'smooth' })
  }

  const handleClickSave = () => {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: data2
      })
      .then(response => {
        console.log(response.data)
        setSave(true)
      })
    setTimeout(() => setSave(false), 5000)
    setTimeout(() => setResult(false), 5000)
  }

  return (
    <div style={styles.primaryMain}>
      <BiPrinter onClick={clickHandlePrinter} />
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

      <div style={styles.result__save}>
        {result && (
          <button onClick={handleClickSave} style={styles.button__save}>
            Сохранить
          </button>
        )}
        {save && <div style={styles.saving}>Данные отправленны!</div>}
      </div>
      <FaArrowAltCircleUp style={styles.marker} onClick={handleScrollClick} />

      {/* {result && (
        <button onClick={handleClickSave} style={styles.button__save}>
          Сохранить
        </button>
      )}
      <FaArrowAltCircleUp /> */}
    </div>
  )
}
