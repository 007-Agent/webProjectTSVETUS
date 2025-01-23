import React from 'react'
import PropTypes from 'prop-types'

import { merge, TLoad, post, Sizer } from 'tinput'
import styles from './styles.js'
import Disable from './Disable'

class Disables extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.refresh = this.refresh.bind(this)
    this.sizer = new Sizer(this)
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
      url: '/api/office/patient/disable',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items.map((v, i) => {
      return (
        <React.Fragment>
          <Disable key={i} style={style.item} disable={v} />
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <div>
          {items}
          <TLoad show={this.state.wait} />
        </div>
      </React.Fragment>
    )
  }
}

Disables.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number,
  disable: PropTypes.object
}

export default Disables
