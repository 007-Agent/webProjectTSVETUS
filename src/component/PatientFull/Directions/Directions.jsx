import React from 'react'
import PropTypes from 'prop-types'

import { merge, TLoad, download, post, TPopup } from 'tinput'

import styles from './styles.js'
import Direction from './Direction'

class Directions extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.refresh = this.refresh.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
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
      url: '/api/office/patient/directions',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  handleDownload(id) {
    let fileName = 'direction.pdf'
    let url =
      'api/office/direction/pdf?patientId=' +
      this.props.patientId +
      '&fileName=' +
      fileName
    download(url, fileName)
  }

  render() {
    const style = merge(styles, this.props.style)

    const items = this.state.items
      ? this.state.items.map((v, i) => (
          <Direction key={i} direction={v} patientId={this.props.patientId} />
        ))
      : null

    return (
      <React.Fragment>
        {items}
        <TLoad show={this.state.wait} />
      </React.Fragment>
    )
  }
}

Directions.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number
}

export default Directions
