import React from 'react'
import PropTypes from 'prop-types'

import { TPopup, strDate, merge } from 'tinput'

import styles from './styles.js'

import AnalysisDetail from './AnalysisDetail'

class Analysis extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = { show: false }
    this.handleShow = this.handleShow.bind(this)
  }

  handleShow(event) {
    if (event.show !== this.state.show) {
      this.setState({ show: event.show })
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let label = (
      <div style={style.row}>
        <div style={style.date}>{strDate(this.props.analysis.date)}</div>
        <div style={style.caption}>{this.props.analysis.name}</div>
      </div>
    )

    return (
      <TPopup
        style={style.popup}
        showIcon={false}
        label={label}
        show={this.state.show}
        onShow={this.handleShow}>
        <AnalysisDetail
          orderId={this.props.analysis.id}
          patientId={this.props.patientId}
          downloads={this.props.downloads}
          onClose={this.handleShow}
        />
      </TPopup>
    )
  }
}

Analysis.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number.isRequired,
  analysis: PropTypes.object.isRequired,
  downloads: PropTypes.any
}

export default Analysis
