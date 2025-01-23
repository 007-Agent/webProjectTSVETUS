import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { merge, cutTime } from 'tinput'

import styles from './styles'

const Interval = props => {
  const visit = props.visit || {}

  const style = merge(styles, props.style)

  const onClick = event => {
    event.preventDefault()
    event.stopPropagation()
    if (props.onClick) props.onClick({ name: props.name, visit })
  }

  return (
    <div style={style.container} onClick={onClick}>
      {cutTime(visit.time)}
    </div>
  )
}

Interval.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  visit: PropTypes.object.isRequired
}

export default Interval
