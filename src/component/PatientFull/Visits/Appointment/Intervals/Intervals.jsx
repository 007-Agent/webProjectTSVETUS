import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import Person from './Person'

import styles from './styles'

const Intervals = props => {
  const intervals = props.intervals || []
  const style = merge(styles, props.style)
  const persons = intervals.map((person, index) => (
    <Person
      style={style.person}
      key={index}
      person={person}
      user={props.user}
      patient={props.patient}
      onRefresh={props.onRefresh}
    />
  ))
  return intervals.length ? <div style={style.container}>{persons}</div> : null
}

Intervals.propTypes = {
  style: PropTypes.object,
  intervals: PropTypes.array,
  user: PropTypes.object,
  patient: PropTypes.object,
  onRefresh: PropTypes.func
}

export default Intervals
