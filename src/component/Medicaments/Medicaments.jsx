import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, merge, post } from 'tinput'

import Medicament from './Medicament'

import styles from './styles.js'

class Medicaments extends React.Component {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.modified && !this.props.modified) {
      this.refresh()
    }
  }

  refresh() {
    post({
      url: '/api/office/patient/medicaments',
      data: { patientId: this.props.patientId },
      sender: this,
      target: 'items'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let items = this.state.items
      ? this.state.items.map((v, i) => {
          return (
            <Medicament
              key={i}
              style={style.item}
              antibiotic={v}
              short={this.props.short}
            />
          )
        })
      : null

    let caption =
      this.props.caption && this.state.items && this.state.items.length > 0 ? (
        <div style={style.text}>{this.props.caption}</div>
      ) : null

    return (
      <div style={style.box}>
        {caption}
        {items}
        <TLoad show={this.state.wait} />
      </div>
    )
  }
}

Medicaments.propTypes = {
  style: PropTypes.object,
  patientId: PropTypes.number,
  caption: PropTypes.string,
  short: PropTypes.any,
  modified: PropTypes.any
}

export default Medicaments
