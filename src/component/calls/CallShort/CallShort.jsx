import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import styles from './styles.js'
import Address from 'component/calls/Address'
import State from 'component/calls/State'
import Contacts from './Contacts'

class CallShort extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.call !== this.props.call
  }

  handleClick(event) {
    //event.stopPropagation();
    if (this.props.call.access > 2) {
      this.props.onClick(this.props.index)
    }
  }

  handleIconClick(id) {
    this.props.showMap(id)
  }

  render() {
    let cursor = { cursor: this.props.call.access > 2 ? 'pointer' : 'default' }

    let style = merge(styles, this.props.style, cursor)

    let call = this.props.call || {}

    let pat = call.nib + ' ' + call.fio + ' ' + call.tip
    if (call.finans) pat += ' ' + call.finans
    if (call.ych) pat += ' уч.' + call.ych

    return (
      <div style={style.frame} onClick={this.handleClick}>
        <State call={call} onClick={this.handleClick} />
        <div style={style.row}>
          <div>{call.number}</div>
          <div>{call.reasonName}</div>
        </div>
        <div style={style.pat}>
          <div>{pat}</div>
        </div>
        <Address call={call} iconClick={this.handleIconClick} />
        <Contacts style={style.contacts} call={call} />
      </div>
    )
  }
}

CallShort.propTypes = {
  call: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default CallShort
