import React from 'react'
import PropTypes from 'prop-types'

import { merge, strDate } from 'tinput'

import styles from './styles.js'

class Disable extends React.Component {
  render() {
    const style = merge(styles, this.props.style)
    const begin = this.props.disable.dateBegin ? (
      <div style={styles.begin}>
        <div style={style.text}>{'приступить к работе с:'}</div>
        <div style={style.date}>{strDate(this.props.disable.dateBegin)}</div>
      </div>
    ) : null
    return (
      <div keyNew={this.props.index} style={styles.container}>
        <div style={style.text}>{'№'}</div>
        <div style={style.number}>{this.props.disable.number}</div>
        <div style={style.person}>{this.props.disable.person}</div>
        <div style={style.text}>{'на период: '}</div>
        <div style={style.period}>
          {strDate(this.props.disable.dateFrom) +
            ' - ' +
            strDate(this.props.disable.dateTo)}
        </div>
        {begin}
      </div>
    )
  }
}

Disable.propTypes = {
  style: PropTypes.object,
  disable: PropTypes.object,
  index: PropTypes.number
}

export default Disable
