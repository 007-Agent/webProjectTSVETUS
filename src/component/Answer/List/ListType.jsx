import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styles from './styles'
import { ModalChange } from '../ModalChange/ModalChange'
import axios from 'axios'

const REF_URL_META = '/rest/meta/results' // URL для получения данных о справочниках.
const REF_URL_TABLE = '/rest/pol/ref'

export const ListType = props => {
  const v = props.v
  console.log(props.value, 'PROPEEER')
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
      let value = props.value ? clone(props.value) : []
      console.log(props.v, 'ЗНАЧЕНИЕ')
      value.push(event.item)
      console.log(event.item, 'EVIIIIIIIIIIIIIIIIIIIIIIIIMT')
      if (props.onChange) {
        props.onChange({
          name: v.name,
          data: v.data,
          value: value
        })
      }
    }
  }

  const handleClickSetState = () => {
    setIsLoading(!isLoading)
  }

  let list = props.value
    ? props.value.map((v, i) => {
        let item = <div style={styles.title}>{v.name}</div>

        return (
          <div key={i} style={styles.list__text}>
            {item}
            {/* // список выбранных пунктов, рядом кнопкаудаления выбранного пунка  */}
          </div>
        )
      })
    : null

  console.log(items)
  return (
    <div style={styles.list__form}>
      <div style={styles.list__title}>{props.v.name}:</div>

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
