import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { post, merge, isoDate, TListBox, TDate, TLoad } from 'tinput'

import { useSender } from 'lib/hooks'

import Intervals from './Intervals'

import styles from './styles'

const refactorIntervals = intervals => {
  const result =
    intervals && Array.isArray(intervals)
      ? intervals.reduce((acc, cur) => {
          const { date, time, visitId, person, branch } = cur
          const foundItem = acc.find(
            v => v.branch.id === branch.id && v.person.id === person.id
          )
          const item = foundItem || { branch, person, dates: [] }
          const foundDateItem = item.dates.find(v => v.date === date)
          const dateItem = foundDateItem || { date, intervals: [] }
          const foundInterval = dateItem.intervals.find(v => v.id === visitId)
          if (!foundInterval) dateItem.intervals.push({ time, id: visitId })
          if (!foundDateItem) item.dates.push(dateItem)
          if (!foundItem) acc.push(item)
          return acc
        }, [])
      : []
  return result
}

const Appointment = props => {
  const specialities = props.specialities
  const style = merge(styles, props.style)
  console.log(props.patient.branchId, 'BRABNNCN')
  const branchId = props.patient.branchId
  const [state, setState] = useState('none')
  const [specId, setSpecId] = useState()
  const [fromDate, setFromDate] = useState(() => new Date())
  const [toDate, setToDate] = useState(() => {
    const now = new Date()
    now.setMonth(now.getMonth() + 1)
    return now
  })
  const [intervals, setIntervals] = useState([])

  const onClick = () => {
    if ('none' === state) setState('add')
    // else setState('none')
  }

  const onChange = event => {
    if ('spec' === event.name) setSpecId(event.value)
    else if ('fromDate' === event.name) setFromDate(event.value)
    else if ('toDate' === event.name) setToDate(event.value)
  }

  const { sender, wait } = useSender()

  const render = () => {
    if (['add', 'int'].includes(state)) {
      return (
        <div style={style.container} onClick={onClick}>
          <div style={style.row}>
            <div>Выберите интервал и специальность</div>
          </div>
          <div style={style.row}>
            <TDate
              style={style.date}
              name={'fromDate'}
              value={fromDate}
              nestedIcon={true}
              format={{ type: 'native' }}
              calendar={true}
              navigators={'month'}
              start={1}
              onChange={onChange}
            />
            <TDate
              style={style.date}
              name={'toDate'}
              value={toDate}
              showIcon={true}
              nestedIcon={true}
              format={{ type: 'native' }}
              calendar={true}
              navigators={'month'}
              start={1}
              onChange={onChange}
            />
          </div>
          <div style={style.row}>
            <TListBox
              style={style.list}
              name={'spec'}
              items={specialities}
              modal={true}
              value={specId}
              nestedIcon={true}
              onChange={onChange}
            />
          </div>
          {!wait ? (
            <Intervals
              style={style.intervals}
              intervals={intervals}
              user={props.user}
              patient={props.patient}
              onRefresh={props.onRefresh}
            />
          ) : null}
          <TLoad style={style.load} show={wait} />
        </div>
      )
    } else {
      const buttonStyle = merge(style.container, style.button)
      return (
        <div style={buttonStyle} onClick={onClick}>
          Новая запись
        </div>
      )
    }
  }

  useEffect(() => {
    if (specId > 0 && fromDate.getTime() <= toDate.getTime()) {
      post({
        url: '/api/sched/intervals',
        data: {
          specId,
          branchId,
          fromDate: isoDate(fromDate),
          toDate: isoDate(toDate)
        },
        sender,
        success: data => {
          setIntervals(refactorIntervals(data))
        }
      })
    }
  }, [fromDate, toDate, specId])

  return render()
}

Appointment.propTypes = {
  style: PropTypes.object,
  patient: PropTypes.object,
  specialities: PropTypes.array,
  user: PropTypes.object,
  onRefresh: PropTypes.func
}

export default Appointment
