import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { merge, post, TPanel, TScroll, TRibbon, TPager } from 'tinput'

import styles from './styles.js'

import Ref from 'component/Ref'

import HospShort from './HospShort'
import HospFull from './HospFull'

const TIMEOUT = 30 * 1000 // Время ожидания перед новым запросом!

const HospList = props => {
  const mounted = useRef(false)
  const timer = useRef(0)
  const userId = props.user && props.user.id ? props.user.id : 0

  const [list, setList] = useState([]) // список пациентов из выбранной больницы!
  const [index, setIndex] = useState(-1) // индекс выбранного пациента
  const [type, setType] = useState(1) // event,value

  const refresh = useRef() // Эта функция выполняет запрос на сервер для получения списка больниц в зависимости от типа и идентификатора пользователя.
  refresh.current = event => {
    clearTimeout(timer.current)
    if (index < 0 && event.userId > 0) {
      // Если индекс выбранной больницы меньше 0 и userId больше 0, формируется запрос с типом больницы.
      const query = { type: event.type } //query, который будет передан на сервер в запросе для получения списка больниц, type - тип больницы.

      // const query = {type}
      post({
        // Делаем запрос на сервер1 для получения списка больниц определенного типа. и идентификатора пользователя.
        url: '/rest/hosp/list',
        data: query, // Этот объект query будет содержать данные, необходимые для получения списка больниц(Стационарных посетителей!) определенного типа.
        success: response => {
          setList(response) // получаем список пациентов и записываем в state
        },
        default: () => {
          timer.current = setTimeout(() => {
            refresh.current(event)
          }, TIMEOUT)
        }
      })
    } else {
      timer.current = setTimeout(() => {
        refresh.current(event)
      }, TIMEOUT)
    }
  }

  const onTypeChange = event => {
    if (event.value !== type) setType(event.value)
  }

  const onClick = event => {
    setIndex(event.index)
  }

  const onClose = () => {
    // закрываем список больниц
    setIndex(-1)
  }

  const onTools = tools => {
    if (props.onTools) props.onTools(tools)
  }

  const onFrame = event => {
    // Показывает список пациентов, если я нажал на нужную карту, то return <HospFull />, если нет, то return <HospShort />. Точнее нажал на index)
    if (index === event.index) {
      return (
        <HospFull
          key={event.item.id}
          index={event.index}
          info={event.item}
          user={props.user}
          onClose={onClose}
          onTools={onTools}
        />
      )
    } else {
      return (
        <HospShort
          key={event.item.id}
          index={event.index}
          info={event.item}
          onClick={onClick}
        />
      )
    }
  }

  useEffect(() => {
    refresh.current({ type, userId })
  }, [type, userId])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false //компонент был размонтирован. Это значение может быть использовано для предотвращения обновления состояния, если компонент больше не смонтирован.
      clearTimeout(timer.current) // предотвращает выполнение кода в таймере
    }
  }, [])

  const style = merge(styles, props.style)

  // useEffect(() => {
  //   if (list && list.length) setIndex(0)
  // }, [list])

  return (
    <div style={style.container}>
      <TPanel style={style.panel}>
        <div style={style.params.container}>
          <Ref
            style={style.params.type}
            name={'type'}
            label={'Тип:'}
            value={type}
            table={'ref_hosp_type'}
            onChange={onTypeChange}
          />
        </div>
        <TPager
          style={style.pager}
          size={50}
          items={list}
          name={'pgGrid'}
          hide={true}
          // onChange={this.onPage}
        />
      </TPanel>

      <TScroll style={style.scroll}>
        <TRibbon
          style={style.ribbon}
          name={'myRibbon'}
          items={list}
          onFrame={onFrame}
          onClick={onClick}
        />
      </TScroll>
    </div>
  )
}

HospList.propTypes = {
  style: PropTypes.object,
  type: PropTypes.number,
  user: PropTypes.object,
  onTools: PropTypes.func,
  onCaption: PropTypes.func
}

export default HospList
