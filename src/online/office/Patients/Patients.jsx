import React from 'react'
import PropTypes from 'prop-types'

import { TPanel, TScroll, TLoad, merge, post } from 'tinput'

import Edit from './Edit'
import Remove from './Remove'

import styles from './styles.js'

import PatientShort from 'component/PatientShort'
import PatientFull from 'component/PatientFull'
import Caption from './Caption'

class Patients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: null,
      patients: [],
      index: -1,
      wait: false,
      remove: -1
    }
    this.refresh = this.refresh.bind(this)
    this.handlePatientClick = this.handlePatientClick.bind(this)
    this.handlePatientClose = this.handlePatientClose.bind(this)
    this.handlePatientRemove = this.handlePatientRemove.bind(this)
    this.handleRemoveClose = this.handleRemoveClose.bind(this)
  }
    
  componentDidMount() {
    this.modified = true
    this.refresh()
  }
  

  componentWillUnmount() {
    this.mounted = false
  }

  refresh() {
    post({
      url: '/api/office/patient/list',
      data: {},
      sender: this,
      target: 'patients'
    })
    
  }

  handlePatientClick(event) {
    this.setState({ index: event.index })
  }
  
  handlePatientClose() {
    this.setState({ index: -1 })
  }

  handlePatientRemove(event) {
    this.setState({ remove: event.index })
  }

  handleRemoveClose(event) {
    this.setState({ remove: -1 })
    if (event.button === 'yes') {
      this.refresh()
    }
  }
  
  render() {
    let style = merge(styles, this.props.style)

    let content = []

    if (this.state.index < 0) {
      content = this.state.patients.map((v, i) => {
        v.fio = v.firstName
        return (
          <PatientShort
            key={i}
            index={i}
            patient={v}
            office={true}
            onRemove={this.handlePatientRemove}
            onClick={this.handlePatientClick}
          />
        )
      })
    } else {
      content = (
        <PatientFull
          source={this.props.source}
          key={0}
          patient={this.state.patients[this.state.index]}
          style={style.full}
          downloads={true}
          showHead={false}
          specialities={this.props.specialities}
          user={this.props.user}
          onClick={this.handlePatientClick}
        />
      )
    }
    
    let caption =
      this.state.wait || this.state.patients.length > 0
        ? 'Пациенты'
        : 'Добавьте пациента'

    return (
      <div style={style.container}>
        <TPanel style={style.panel}>
          <Caption
            style={style.caption}
            patient={this.state.patients[this.state.index]}
            caption={caption}
            onClose={this.handlePatientClose}
          />
        </TPanel>

        <TScroll style={style.scroll}>
          <div style={style.patients}>{content}</div>
          <TLoad show={this.state.wait} inline={true} />
          <Edit
            onAdd={() => {
              this.refresh()
            }}
          />
        </TScroll>

        <Remove
          style={style.remove}
          name={'remove'}
          patient={this.state.patients[this.state.remove]}
          onClose={this.handleRemoveClose}
        />
      </div>
    )
  }
}

Patients.propTypes = {
  style: PropTypes.object,
  source: PropTypes.string,
  specialities: PropTypes.array,
  user: PropTypes.object
}

Patients.defaultProps = {
  source: 'office'
}

export default Patients
