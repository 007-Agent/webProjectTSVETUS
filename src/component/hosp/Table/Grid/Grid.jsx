import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import styles from './styles'

const Grid = props => {
  const cells = props.cells || []
  const [rows, cols] = [cells.length, cells[0]?.length || 0]

  const containerStyle =
    rows && cols
      ? {
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, auto)`,
          gridTemplateColumns: `repeat(${cols}, auto)`
        }
      : {}

  const style = merge(styles, props.style, { container: containerStyle })

  const items =
    rows && cols
      ? cells.reduce((acc, cur, rowId) => {
          acc.push(
            cur.map((v, colId) => (
              <div key={`${rowId}_${colId}`} style={style.cell}>
                {v ? v.text : ''}
              </div>
            ))
          )
          return acc
        }, [])
      : null

  return <div style={style.container}>{items}</div>
}

Grid.propTypes = {
  style: PropTypes.object,
  cells: PropTypes.array
}

export default Grid
