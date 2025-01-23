import React from 'react'
import PropTypes from 'prop-types'

import { strDate, merge, TIcon, TLoad, download, post, Sizer } from 'tinput'

import styles from './styles.js'

class Vaccination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
    this.sizer = new Sizer(this)
    this.handleDownload = this.handleDownload.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    this.sizer.free()
  }

  handleDownload() {
    let fileName = 'Vactination' + this.props.orderId + '.pdf'
    let url =
      'api/office/vaccination/pdf?patientId=' +
      this.props.patientId +
      '&fileName=' +
      fileName
    download(url, fileName)
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose({ show: false })
    }
  }

  render() {
    let style = merge(styles, this.props.style)
    return (
      <div key={this.props.index} style={style.container}>
        <div style={style.date}>{strDate(this.props.vaccination.date)}</div>
        <div style={style.group}>{this.props.vaccination.group}</div>
        <div style={style.name}>({this.props.vaccination.name})</div>
        {this.props.vaccination.series ? (
          <div style={style.series}>серия: {this.props.vaccination.series}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Vaccination.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number,
  vaccination: PropTypes.object.isRequired
}

export default Vaccination
