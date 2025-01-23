import React from 'react'
import PropTypes from 'prop-types'

import { strDate, merge, TIcon, TLoad, download, post, Sizer } from 'tinput'
import styles from './styles.js'
import PNDs from './PNDs'

class PND extends React.PureComponent {
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
      url: '/api/office/patient/pnd',
      data: { patientId: this.props.patientId, pndId: this.props.orderId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items.map((v, i) => {
      return <PNDs key={i} style={style.item} history={v} />
    })

    return (
      <div>
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

PND.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number,
  orderId: PropTypes.number
}

export default PND
