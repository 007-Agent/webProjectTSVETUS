import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { merge, cutDate } from 'tinput'

import Interval from './Interval'
import Edit from './Edit'

import styles from './styles'

const Person = props => {
  const person = props.person
  console.log(person, 'PERS')
  const [visitId, setVisitId] = useState(0)
  const [index, setIndex] = useState(-1)
  const now = new Date()
  const currentTime = now.getHours() + ':' + now.getMinutes()
  console.log(currentTime, 'CDCCDCD')
  const style = merge(styles, props.style)

  const onClick = () => {
    setIndex(-1)
  }

  const onSign = event => {
    const id = event.visit?.id
    console.log(id, 'IIII')
    if (id > 0) setVisitId(id)
    else setVisitId(0)
  }

  const onClose = event => {
    setVisitId(0)
    if (event && event.refresh && props.onRefresh) props.onRefresh()
  }

  const onDateClick = index => event => {
    event.preventDefault()
    event.stopPropagation()
    setIndex(index)
  }

  const processedPerson = person
    ? {
        ...person,
        dates:
          person.dates?.map(date => {
            // Проверяем, сегодняшняя ли это дата
            const today = new Date()
            const todayString = today.toISOString().split('T')[0]
            const isTodayDate = date.date === todayString

            // Фильтруем интервалы только для сегодняшней даты
            const intervals = isTodayDate
              ? date.intervals?.filter(visit => {
                  const now = new Date()
                  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
                  return visit.time && visit.time.substring(0, 5) >= currentTime
                }) || []
              : date.intervals || [] // Для не-сегодняшних оставляем все интервалы

            return {
              ...date,
              intervals
            }
          }) || []
      }
    : null
  console.log(processedPerson, 'PR')
  console.log(person, 'PR22')
  const dates = processedPerson.dates
    ? processedPerson.dates.map((date, dateIndex) => {
        if (dateIndex === index) {
          const intervals = date.intervals
            ? date.intervals.map(visit => (
                <Interval
                  style={style.time}
                  key={visit.id}
                  visit={visit}
                  onClick={onSign}
                />
              ))
            : null
          return (
            <div style={style.date.intervals} key={dateIndex}>
              <div style={style.date.text}>
                Интервалы, доступные на {cutDate(date.date)}:
              </div>
              {intervals}
            </div>
          )
        } else {
          return (
            <div
              style={style.date.short}
              key={dateIndex}
              onClick={onDateClick(dateIndex)}>
              {cutDate(date.date)}
            </div>
          )
        }
      })
    : null
  console.log(dates, 'DATES')
  console.log(index, 'INDEX')
  const datesCaption =
    index < 0 ? (
      <div style={style.date.text}>Даты, доступные для записи:</div>
    ) : null

  return (
    <div style={style.container}>
      <div style={style.caption} onClick={onClick}>
        <div style={style.fio}>{person.person.name}</div>
        <div style={style.branch}>({person.branch.name})</div>
      </div>
      <div style={style.date.container} onClick={onClick}>
        {datesCaption}
        <div style={style.date.content}>{dates}</div>
      </div>
      <Edit
        visitId={visitId}
        user={props.user}
        patient={props.patient}
        onClose={onClose}
      />
    </div>
  )
}

Person.propTypes = {
  style: PropTypes.object,
  person: PropTypes.object.isRequired,
  user: PropTypes.object,
  patient: PropTypes.object,
  onRefresh: PropTypes.func
}

export default Person
