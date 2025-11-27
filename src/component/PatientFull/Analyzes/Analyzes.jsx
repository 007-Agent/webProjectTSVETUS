import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post } from 'tinput'

import Analysis from './Analysis'

import styles from './styles.js'

class Analyzes extends React.PureComponent {
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
    post({
      url: '/api/office/patient/analyzes',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items.map((v, i) => {
      return (
        <Analysis
          key={i}
          style={style.item}
          patientId={this.props.patientId}
          analysis={v}
          downloads={this.props.downloads}
        />
      )
    })

    return (
      <div>
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Analyzes.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number,
  downloads: PropTypes.any
}

export default Analyzes
