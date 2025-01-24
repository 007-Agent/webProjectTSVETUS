import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { post, clone, merge } from 'tinput'

import styles from './styles'

import MetaData from 'component/MetaData'
import MetaRecords from 'component/MetaRecords'

import Info from './Info'

import Saver from '../../../Saver'

const PROJECT = 'hosp'

const HospFull = props => {
  // ПОДРОБНОЕ ОПИСАНИЕ КАРТОЧКИ ПАЦИАЕНТА
  const mounted = useRef(false)

  const [info, setInfo] = useState(props.info || {})
  const [tasks, setTasks] = useState([]) // массив с задачами для выполнения

  const id = props.info.id // Пациент с которым щас работаем!

  const refresh = useRef()
  refresh.current = event => {
    // refresh: используется для выполнения запроса к серверу для получения полной информации о пациенте. Выполнение запроса происходит в функции refresh
    const query = { hospId: event.id } //
    post({
      url: '/rest/hosp/full',
      data: query,
      success: response => {
        setInfo(response)
      }
    })
  }

  const onTools = useRef() // управляет отображением кнлопок на панели инструментов
  onTools.current = event => {
    if (props.onTools) {
      // если  функция props.onTools не пустая true
      props.onTools(event.tools) // то цикл выполняется
    }
  }

  const onClose = () => {
    if (props.onClose) props.onClose() // Функция вызывается при закрытии окна. Она вызывает функцию onClose из props
  }

  const onClear = () => {
    // Функция очищает список задач
    if (mounted.current) {
      setTasks([])
    }
  }

  const onChange = task => {
    // task - переданное значение!
    const newTasks = clone(tasks) // создается копия массива tasks, в котором будут изменены значения
    const oldTask = tasks.find(v => {
      // цикл по массиву tasks, который содержит измененные значения
      return v.name === task.name // если значение равняется с переданным значением то цикл выполняется
    })
    if (task.save && task.cancel) {
      // если есть два кнопки сохранения и отмены то цикл выполняется
      if (oldTask === undefined) {
        newTasks.push(task)
      }
    } else {
      newTasks.forEach((v, i) => {
        if ((task.name = v.name)) {
          // Если имя задачи совпадает с именем в массиве tasks то цикл выполняется

          v.save = null
          v.cancel = null
        }
      })
    }
    setTasks(newTasks) // В конце функция обновляет состояние tasks, устанавливая его в newTasks, что вызывает повторный рендер компонента с обновленным списком задач
  }

  useEffect(() => {
    // ��ункция обновляет список задач
    refresh.current({ id })
  }, [id])

  useEffect(() => {
    // Функция очищает список задач
    mounted.current = true
    onTools.current({ tools: [{ icon: 'close', onClick: onClose }] })
    return () => {
      mounted.current = false
      onTools.current({ tools: [] })
    }
  }, [])

  const style = merge(styles, props.style)

  const inspection =
    info.inspection && info.inspection.length ? (
      <MetaData // полная форма осмотра пациента
        style={style.data}
        data={info.inspection} // передаём данные
        name={'inspection'}
        project={PROJECT}
        type={PROJECT}
        onChange={onChange}
        show={false}
        user={props.user} // пользователь
        caption={'Первичный осмотр'}
      />
    ) : null

  const records =
    info.records && info.records.length ? (
      <MetaRecords //
        style={style.data}
        data={info.records}
        name={'records'}
        project={PROJECT}
        show={false}
        user={props.user}
        onChange={onChange}
        caption={'Дневниковые записи'}
      />
    ) : null

  const temperature =
    info.temperature && info.temperature.length ? (
      <MetaRecords
        style={style.data}
        data={info.temperature}
        name={'temperature'}
        project={PROJECT}
        show={false}
        user={props.user}
        onChange={onChange}
        caption={'Температурный лист'}
      />
    ) : null

  // const summary =
  //   info.summary && info.summary.length ? (
  //     <MetaData
  //       style={style.data}
  //       data={info.summary}
  //       name={'summary'}
  //       project={PROJECT}
  //       type={PROJECT}
  //       show={false}
  //       onChange={onChange}
  //       caption={'Выписной эпикриз'}
  //     />
  //   ) : null

  return (
    <div style={style.wrapper}>
      <div style={style.container}>
        <Info style={style.info} info={info} /> *// в info передаём информацию о
        пациенте с которым работаем,из функции refresh *//
        {inspection}
        {records}
        {temperature}
        <Saver tasks={tasks} onClear={onClear} />
      </div>
    </div>
  )
}

HospFull.propTypes = {
  style: PropTypes.object,
  info: PropTypes.object,
  user: PropTypes.object
}

export default HospFull
