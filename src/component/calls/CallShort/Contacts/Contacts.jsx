import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import styles from './styles.js'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = merge(styles, this.props.style)

    const contacts = [
      <div key={0} style={style.title}>
        {'телефон:'}
      </div>
    ]
    if (this.props.call?.callPhone)
      contacts.push(
        <div key={1} style={style.phone}>
          {this.props.call?.callPhone}
        </div>
      )
    if (this.props.call?.callFio)
      contacts.push(
        <div key={2} style={style.fio}>
          ({this.props.call?.callFio})
        </div>
      )

    return (
      <div style={style.container}>
        <div style={style.block}>{contacts.length > 1 ? contacts : null}</div>
      </div>
    )
  }
}

Contacts.propTypes = {
  call: PropTypes.object.isRequired
}

export default Contacts
