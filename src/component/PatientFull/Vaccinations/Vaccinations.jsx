import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post, download, TIcon } from 'tinput'

import Vaccination from './Vaccination'

import styles from './styles.js'

class Vaccinations extends React.PureComponent {
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

  handleDownload() {
    let fileName = 'Vactination.pdf'
    let url =
      'api/office/vaccination/pdf?patientId=' +
      this.props.patientId +
      '&analyzeId=' +
      this.props.orderId +
      '&fileName=' +
      fileName
    download(url, fileName)
  }
  refresh() {
    post({
      url: '/api/office/patient/vaccinations',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)
    let items = this.state.items.map((v, i) => {
      return <Vaccination key={i} style={style.item} vaccination={v} />
    })
    return (
      <React.Fragment>
        <div style={style.row}>
          <TIcon
            style={style.icon}
            name={'save'}
            timeout={7000}
            onClick={this.handleDownload}
          />
        </div>
        {items}
        <TLoad show={this.state.wait} />
      </React.Fragment>
    )
  }
}

Vaccinations.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number
}

export default Vaccinations
