import React from 'react'
import PropTypes from 'prop-types'

import { merge, strDate } from 'tinput'

import styles from './styles.js'

class Contract extends React.Component {
  render() {
    let style = merge(styles, this.props.style)

    let cs = style.container
    if (!this.props.contract.relevance) {
      cs = merge(cs, style.expired)
    }

    return (
      <div key={this.props.index} style={cs}>
        <div style={style.number}>{this.props.contract.number}</div>
        <div style={style.period}>
          ({strDate(this.props.contract.from)}
          &nbsp;-&nbsp;
          {strDate(this.props.contract.to)})
        </div>
      </div>
    )
  }
}

Contract.propTypes = {
  style: PropTypes.object,
  contract: PropTypes.object,
  index: PropTypes.number
}

export default Contract
