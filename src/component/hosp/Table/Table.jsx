import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { post, merge, TPanel, TScroll } from 'tinput'

import styles from './styles'

import useCells from './Cells'
import Grid from './Grid'

const TIMEOUT = 30 * 1000

const Table = props => {
  const timer = useRef(0)

  const user = props.user || null

  const [table, setTable] = useState([])
  const [from, setFrom] = useState(() => new Date())
  const [to, setTo] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  })

  const refresh = useRef()
  refresh.current = () => {
    clearTimeout(timer.current)
    if (user && user.id) {
      const query = { from, to }
      post({
        url: '/rest/hosp/table',
        data: query,
        success: response => {
          setTable(response)
        },
        default: () => {
          timer.current = setTimeout(() => {
            refresh.current()
          }, TIMEOUT)
        }
      })
    } else {
      timer.current = setTimeout(() => {
        refresh.current()
      }, TIMEOUT)
    }
  }

  useEffect(() => {
    if (user && user.id) refresh.current()
    else clearTimeout(timer.current)
    return () => {
      clearTimeout(timer.current)
    }
  }, [user])

  const cells = useCells({ table, from, to })

  const style = merge(styles, props.style)

  return (
    <div style={style.container}>
      <TPanel style={style.panel}></TPanel>
      <TScroll style={style.scroll}>
        <Grid style={style.grid} cells={cells} />
      </TScroll>
    </div>
  )
}

Table.propTypes = {
  style: PropTypes.object,
  user: PropTypes.object
}

export default Table
