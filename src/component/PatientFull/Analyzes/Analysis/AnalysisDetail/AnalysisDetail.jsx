import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, TIcon, download, merge, post, Sizer } from 'tinput'

import styles from './styles.js'

import ResultTable from './Results/ResultTable.jsx'
import ResultText from './Results/ResultText.jsx'

class AnalysisDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      results: []
    }
    this.refresh = this.refresh.bind(this)
    this.sizer = new Sizer(this)
    this.handleDownload = this.handleDownload.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
    this.sizer.free()
  }

  handleDownload() {
    let fileName = 'Analyze_' + this.props.orderId + '.pdf'
    let url =
      'api/office/analyze/pdf?patientId=' +
      this.props.patientId +
      '&analyzeId=' +
      this.props.orderId +
      '&fileName=' +
      fileName
    download(url, fileName)
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose({ show: false })
    }
  }

  refresh() {
    post({
      url: '/api/office/patient/analysis',
      data: {
        patientId: this.props.patientId,
        orderId: this.props.orderId
      },
      sender: this,
      target: 'results'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let buttons = (
      <div style={style.row}>
        <TIcon
          style={style.icon}
          name={'save'}
          timeout={7000}
          onClick={this.handleDownload}
        />
        <TIcon style={style.icon} name={'close'} onClick={this.handleClose} />
      </div>
    )

    let content = null
    if (!this.state.wait) {
      if (this.state.width >= 900) {
        content = (
          <ResultTable style={style.table} results={this.state.results} />
        )
      } else {
        content = <ResultText style={style.text} results={this.state.results} />
      }
    }

    return (
      <div style={style.container}>
        {buttons}
        {content}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

AnalysisDetail.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  onClose: PropTypes.func
}

export default AnalysisDetail
