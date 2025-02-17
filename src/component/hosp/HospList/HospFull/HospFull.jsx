import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { post, clone, merge } from 'tinput'

import styles from './styles'

import MetaData from 'component/MetaData'
import MetaRecords from 'component/MetaRecords'

import Info from './Info'

import Saver from '../../../Saver'

const PROJECT = 'hosp' // пределяется константа PROJECT, которая используется для обозначения текущего проекта (в данном случае, это 'hosp').

const HospFull = props => {
  //  предназначен для отображения полной информации о пациенте в контексте медицинского приложения. первичный осмотр, Дневниковые хаписи, Темп.лист
  const mounted = useRef(false)

  const [info, setInfo] = useState(props.info || {}) // хранит инфу о пациенте
  const [tasks, setTasks] = useState([]) // массив задач, которые могут быть связаны с сохранением данных.

  const id = props.info.id

  const refresh = useRef()
  refresh.current = event => {
    const query = { hospId: event.id }
    console.log(query, 'QUERYYYYY')
    post({
      url: '/rest/hosp/full',
      data: query,
      success: response => {
        setInfo(response)
      }
    })
  }
  console.log(info, 'info-onePacient') // данные об однои пациенте, кликая на его карточку
  const onTools = useRef()
  onTools.current = event => {
    if (props.onTools) {
      props.onTools(event.tools)
    }
  }

  const onClose = () => {
    if (props.onClose) props.onClose()
  }

  const onClear = () => {
    if (mounted.current) {
      setTasks([])
    }
  }

  const onChange = task => {
    //
    console.log(task, 'TASKSSSSSS')
    const newTasks = clone(tasks)
    const oldTask = tasks.find(v => {
      return v.name === task.name
    })
    if (task.save && task.cancel) {
      if (oldTask === undefined) {
        newTasks.push(task)
      }
    } else {
      newTasks.forEach((v, i) => {
        if ((task.name = v.name)) {
          v.save = null
          v.cancel = null
        }
      })
    }
    setTasks(newTasks)
  }

  useEffect(() => {
    refresh.current({ id })
  }, [id]) // Первый useEffect вызывает refresh для получения данных при первом рендере компонента и при изменении id.

  useEffect(() => {
    // Второй useEffect устанавливает состояние монтирования и настраивает инструменты (например, кнопку закрытия) при монтировании компонента.
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
      <MetaData
        style={style.data}
        data={info.inspection} // info.insection - все вопросы из первичного осмотра!
        name={'inspection'}
        project={PROJECT}
        type={PROJECT}
        onChange={onChange}
        show={false}
        user={props.user}
        caption={'Первичный осмотр'}
      />
    ) : null

  const records =
    info.records && info.records.length ? (
      <MetaRecords
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

  const summary =
    info.summary && info.summary.length ? (
      <MetaData
        style={style.data}
        data={info.summary}
        name={'summary'}
        project={PROJECT}
        type={PROJECT}
        show={false}
        onChange={onChange}
        caption={'Выписной эпикриз'}
      />
    ) : null

  return (
    <div style={style.wrapper}>
      <div style={style.container}>
        <Info style={style.info} info={info} />
        {/* // отображает элементы для осмотра пациента */}
        {inspection}
        {records}
        {temperature}
        {summary}
        <Saver tasks={tasks} onClear={onClear} />
        {/* Компонент Saver отвечает за сохранение компонетов */}
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
