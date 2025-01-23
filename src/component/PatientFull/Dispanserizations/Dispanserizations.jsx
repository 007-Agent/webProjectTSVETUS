import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { merge, TLoad, post } from 'tinput'
import styles from './styles.js'
import Dispanserization from './Dispanserization'

class Dispanserizations extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      wait: false
    }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  refresh() {
    post({
      url: '/api/office/patient/dispanserizations',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    const style = merge(styles, this.props.style)

    const items = this.state.items
      ? this.state.items.map((v, i) => {
          return (
            <div key={i} style={style.obs}>
              <Dispanserization
                key={i}
                style={style.visit}
                dispanserization={v}
              />
            </div>
          )
        })
      : null

    return (
      <div>
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Dispanserizations.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number
}

export default Dispanserizations
