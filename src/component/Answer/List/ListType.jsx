import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styles from './styles'
import { ModalChange } from '../ModalChange/ModalChange'
import axios from 'axios'
import { FiMinusCircle } from 'react-icons/fi'

const REF_URL_META = '/rest/meta/results' // URL для получения данных о справочниках.
const REF_URL_TABLE = '/rest/pol/ref'

export const ListType = props => {
  const [valueNew, setValue] = useState(props.value)
  console.log(valueNew, 'PROPEEER')
  const v = props.v
  // console.log(props.value, 'PROPEEER121212')
  const [items, setItems] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const clone = (source, exclude) => {
    let dest = null
    if (typeof source === 'function') {
      dest = source
    } else if (source instanceof Array) {
      dest = source.slice()
      for (let i = 0; i < dest.length; i++) {
        dest[i] = clone(dest[i], exclude)
      }
    } else if (React.isValidElement(source)) {
      dest = source
    } else if (source instanceof Date) {
      dest = new Date(source.getTime())
    } else if (source instanceof Object) {
      dest = {}
      let keys = Object.keys(source)
      for (let i = 0; i < keys.length; i++) {
        if (exclude && exclude.indexOf(keys[i]) >= 0) {
          continue
        }
        dest[keys[i]] = clone(source[keys[i]], exclude)
      }
    } else {
      dest = source
    }
    return dest
  }

  React.useEffect(() => {
    setValue(props.value || [])
  }, [props.value])

  const fetchData = async () => {
    let params = {}

    // Определяем параметры для запроса
    if (props.id) {
      params = {
        url: REF_URL_META,
        data: { id: props.id }
      }
    } else if (table) {
      params = {
        url: REF_URL_TABLE,
        data: { table: table }
      }
    } else {
      console.warn('Не указаны параметры для запроса.')

      return
    }

    try {
      const response = await axios.post(params.url, params.data)
      setItems(response.data.data || []) // Устанавливаем полученные данные
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      // Устанавливаем загрузку в false после запроса
    }
  }

  useEffect(() => {
    fetchData() // Вызываем функцию для получения данных при монтировании компонента
  }, [])

  const handleRefChange = event => {
    console.log(event, 'Что передали!')

    if (event.item && event.index >= 0) {
      let value = clone(valueNew)
      console.log(props.value, 'ЗНАЧЕНИЕ')
      value.push(event.item)
      console.log(value, 'EVIIIIIIIIIIIIIIIIIIIIIIIIMT')
      console.log(event.item, 'EVIIIIIIIIIIIIIIIIIIIIIIIIMT')
      setValue(value)
      if (props.onChange) {
        props.onChange({
          name: '',
          data: '',
          value: value
        })
        setIsLoading(false)
      }

      console.log(value, '????')
    }
  }
  const handleDelete = event => {
    console.log(event, 'DELETE')
    let index = event
    console.log(index)
    if (index >= 0) {
      let value = clone(valueNew)
      console.log(value, 'valuedelete')
      value = valueNew.filter((_, i) => i !== index)
      setValue(value)
      if (props.onChange) {
        props.onChange({
          name: '',
          data: '',
          value: value
        })
      }
    }
  }

  const handleClickSetState = () => {
    setIsLoading(!isLoading)
  }

  let list = valueNew
    ? valueNew.map((v, i) => {
        let item = <div style={styles.title}>{v.name}</div>

        return (
          <div key={i} style={styles.list__text}>
            {item}
            {/* // список выбранных пунктов, рядом кнопкаудаления выбранного пунка  */}
            <FiMinusCircle
              style={styles.minus}
              onClick={() => handleDelete(i)}
            />
          </div>
        )
      })
    : null
  console.log(valueNew, 'LISTIK')
  console.log(items)
  return (
    <div style={styles.list__form}>
      <div style={styles.list__title}>{props.v.name}</div>

      <div style={styles.list__full}>
        {list}
        <div style={styles.list__check}>
          <div style={styles.list__change}>
            <div style={styles.list__content}>
              <div style={styles.list__tabindex}></div>
              <FaPlusCircle style={styles.icon} onClick={handleClickSetState} />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <ModalChange items={items} v={v} onClick={handleRefChange} />
      )}
    </div>
  )
}
