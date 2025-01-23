import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post } from 'tinput'

import Visit from './Visit'
import Appointment from './Appointment'

import styles from './styles.js'

class Visits extends React.PureComponent {
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
    const patientId = this.props.patient?.id || 0
    if (patientId > 0) {
      post({
        url: '/api/visit/list',
        data: { query: { patientId } },
        sender: this,
        target: 'items'
      })
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items.map((v, i) => {
      return (
        <Visit
          key={i}
          style={style.visit}
          patient={this.props.patient}
          visit={v}
          onRefresh={this.refresh}
        />
      )
    })

    return (
      <div>
        <Appointment
          patient={this.props.patient}
          specialities={this.props.specialities}
          user={this.props.user}
          onRefresh={this.refresh}
        />
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Visits.propTypes = {
  style: PropTypes.object,
  patient: PropTypes.object,
  specialities: PropTypes.array,
  user: PropTypes.object
}

export default Visits
