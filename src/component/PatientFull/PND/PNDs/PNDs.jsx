import React from 'react'
import PropTypes from 'prop-types'

import { merge, strDate, download, TIcon } from 'tinput'

import styles from './styles.js'

class PNDs extends React.Component {
  constructor(props) {
    super(props)
    this.handleDownload = this.handleDownload.bind(this)
  }

  handleDownload() {
    let fileName = 'PND.pdf'
    let url =
      'api/office/history/pdf?patientId=' +
      this.props.history.id +
      '&pndId=' +
      this.props.history.idInt +
      '&fileName=' +
      fileName
    download(url, fileName)
  }

  render() {
    let style = merge(styles, this.props.style)
    return (
      <div key={this.props.index} style={style.container}>
        <div style={style.number}>{this.props.history.number}</div>
        <div style={style.date}>{strDate(this.props.history.date)}</div>
        <div style={style.fio}>{this.props.history.fio}</div>
        <div style={style.diagnosis}>{this.props.history.diagnosis}</div>
        <div style={style.iconBox}>
          <TIcon
            style={style.icon}
            name={'save'}
            timeout={7000}
            onClick={this.handleDownload}
          />
        </div>
      </div>
    )
  }
}

PNDs.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object,
  index: PropTypes.number
}

export default PNDs
