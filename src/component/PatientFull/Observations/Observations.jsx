import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post } from 'tinput'

import styles from './styles.js'
import Observation from './Observation'

class Observations extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: []
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
    if (this.props.patientId > 0) {
      post({
        url: '/rest/office/patient/observations',
        data: {
          patientId: this.props.patientId,
          helpId: null
        },
        sender: this,
        target: 'items'
      })
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = null
    if (this.state.items) {
      items = this.state.items.map((v, i) => {
        return (
          <div key={i} style={style.obs}>
            <Observation style={style.visit} observation={v} />
          </div>
        )
      })
    }

    return (
      <div>
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Observations.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number
}

export default Observations
