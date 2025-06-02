import React, { useState, useEffect } from 'react'
import styles from './styles'

import axios from 'axios'

export const Record = props => {
  const value = props.value
  const obj = JSON.parse(props.value?.data?.list?.[0]?.name)

  console.log(obj.text, 'OOOBBBBJECT')
  console.log(value, 'ЧТО ТАКОЕ ЭТО')
  const title = obj.text
  console.log(props.user.name, 'POLZOVATEL')
  // Преобразуем строку в объект
  const initialText = title // Получаем начальное значение текста
  const [text, setText] = useState(initialText)
  const [result, setResult] = useState(props.value)
  const [debouncedText, setDebouncedText] = useState(text)
  const [isTextModified, setIsTextModified] = useState(false)
  console.log(result)
  // console.log(parsedName, "НУЖЕН ОБЪЕКТ");
  // Получаем начальное значение текста

  // const [record, setRecord] = useState(value);
  const now = new Date()
  const strDate = date => {
    return `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`
  }

  const cutTime = date => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`
  }
  const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(
    now.getMonth() + 1
  ).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(
    2,
    '0'
  )}:${String(now.getMinutes()).padStart(2, '0')}`

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text)
    }, 2000)

    return () => {
      clearTimeout(handler)
    }
  }, [text])

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)
    setIsTextModified(true)
  }
  function HandleInfoDelete(event) {
    setIsTextModified(false)
    if (props.onDelete) {
      props.onDelete({ key: event.key })
    }
  }

  const handleSubmit = () => {
    setIsTextModified(false)
    const current = new Date()

    const values = value
    console.log(values.data.list[0])
    const obj = JSON.stringify(values.data.list[0].name)
    console.log(obj, 'IBJ')
    console.log(JSON.stringify(values.data.list[0].name), 'NOTHING')
    const newRecord = JSON.stringify({
      type: 'record',
      user: { id: props.user.id, name: props.user.name },
      date: strDate(current),
      time: cutTime(current),
      text: text // Используем текущее состояние text
    })
    console.log(newRecord, 'IBJJ2')

    console.log(newRecord.text, 'TEXT')
    values.data.list[0].name = newRecord
    setResult(values)
    console.log(values, 'Values efiwefnuiwenfuiwebnfweuibfwuifbwe')

    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: [values]
      })
      .then(response => {
        console.log(response, 'res')
      })
  }

  return (
    <>
      {/* <div style={styles.record__main}> */}
      {/* <div style={styles.record__date}>
          <div style={styles.record__date}>
            <h3 style={styles.targetElement}>Дата: </h3>
            <span style={styles.span}>{obj.date}</span>
            <span style={styles.span}>{obj.time}</span>
          </div>
        </div>
        <textarea
          // value={initialText ? initialText : text}
          value={text}
          type='text'
          style={styles.record__input}
          placeholder='Напишите запись'
          onChange={handleChange}
          onInput={e => {
            e.target.style.height = '38px' // Сброс высоты
            e.target.style.height = `${e.target.scrollHeight}px` // Установка высоты на основе прокрутки
          }}
        /> */}
      {/* <button onClick={handleSubmit} style={styles.button}>
            Сохранить
          </button> */}

      <tbody>
        <tr>
          <td style={{ border: '1px solid black', textAlign: 'center' }}>
            <span style={styles.span}>{obj.date}</span>
            <span style={styles.span}>{obj.time}</span>
          </td>
          <td style={{ border: '1px solid black' }}>
            <textarea
              value={text}
              type='text'
              style={styles.record__input}
              placeholder='Напишите запись'
              onChange={handleChange}
              onInput={e => {
                e.target.style.height = '38px' // Сброс высоты
                e.target.style.height = `${e.target.scrollHeight}px` // Установка высоты на основе прокрутки
              }}
            />
          </td>
        </tr>
      </tbody>

      {isTextModified && text && (
        // Проверяем, изменился ли текст и есть ли текст в поле
        <div style={styles.buttonInfo}>
          <button onClick={handleSubmit} style={styles.button}>
            Сохранить
          </button>
          <button onClick={HandleInfoDelete} style={styles.button}>
            Удалить
          </button>
        </div>
      )}
      {/* </div> */}
    </>
  )
}
