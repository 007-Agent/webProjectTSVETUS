import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post } from 'tinput'

import Contract from './Contract'

import styles from './styles.js'

class Contracts extends React.PureComponent {
  constructor(props, context) {
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
      url: '/api/office/patient/contracts',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items.map((v, i) => {
      return <Contract key={i} style={style.item} contract={v} />
    })

    return (
      <div>
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Contracts.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number
}

export default Contracts
