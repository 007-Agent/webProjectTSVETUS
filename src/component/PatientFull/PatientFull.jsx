import React from 'react'
import PropTypes from 'prop-types'

import { TPopup, merge, strDate } from 'tinput'

import styles from './styles.js'

import Medicaments from 'component/Medicaments'

import Analyzes from './Analyzes'
import Vaccinations from './Vaccinations'
import Contracts from './Contracts'
import Visits from './Visits'
import Observations from './Observations'
import PND from './PND'
import Disables from './Disables/Disables.jsx'
import Directions from './Directions'
import Dispanserizations from './Dispanserizations'
import Techniques from './Techniques/Techniques.jsx'

class PatientFull extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      analyzes: []
    }
    this.handleClick = this.handleClick.bind(this)
    console.log(this.props.patient, 'PATIENTS')
  }

  handleClick() {
    this.props.onClick({ index: -1 })
  }

  render() {
    let style = merge(styles, this.props.style)

    let head = this.props.showHead ? (
      <div style={style.box}>
        <div style={style.head.container}>
          <div style={style.head.nib}>{this.props.patient.nib}</div>
          <div style={style.head.nib}>
            {this.props.patient.tip}
            {this.props.patient.finans}
          </div>
        </div>
        <div style={style.fio}>{this.props.patient.fio}</div>
        <div style={style.age}>
          {strDate(this.props.patient.birthday) +
            ' (' +
            this.props.patient.age +
            ')'}
        </div>
      </div>
    ) : null

    return (
      <div style={style.container}>
        {head}

        <TPopup style={style.popup} label={'Договоры:'}>
          <Contracts patientId={this.props.patient.id} />
        </TPopup>

        <TPopup style={style.popup} label={'Больничные листы:'}>
          <Disables patientId={this.props.patient.id} />
        </TPopup>

        <TPopup style={style.popup} label={'Лабораторные исследования:'}>
          <Analyzes
            patientId={this.props.patient.id}
            downloads={this.props.downloads}
          />
        </TPopup>

        <TPopup style={style.popup} label={'Вакцинация:'}>
          <Vaccinations patientId={this.props.patient.id} />
        </TPopup>

        <TPopup style={style.popup} label={'Антибактериальная терапия:'}>
          <Medicaments patientId={this.props.patient.id} />
        </TPopup>

        <TPopup style={style.popup} label={'Активное наблюдение:'}>
          <Observations patientId={this.props.patient.id} />
        </TPopup>

        {'office' !== this.props.source ? (
          <TPopup style={style.popup} label={'ПНД'}>
            <PND patientId={this.props.patient.id} />
          </TPopup>
        ) : null}

        <TPopup style={style.popup} label={'Направления:'}>
          <Directions patientId={this.props.patient.id} />
        </TPopup>

        <TPopup style={style.popup} label={'Диспансеризация:'}>
          <Dispanserizations patientId={this.props.patient.id} />
        </TPopup>
        <TPopup style={style.popup} label={'Запись на прием:'}>
          <Visits
            patient={this.props.patient}
            specialities={this.props.specialities}
            user={this.props.user}
          />
        </TPopup>
        <TPopup
          style={style.popup}
          label={'Консультация, диагностика, документация'}>
          <Techniques
            patient={this.props.patient}
            specialities={this.props.specialities}
            user={this.props.user}
          />
        </TPopup>
      </div>
    )
  }
}

PatientFull.propTypes = {
  style: PropTypes.object,
  source: PropTypes.string,
  patient: PropTypes.object.isRequired,
  downloads: PropTypes.any,
  showHead: PropTypes.any,
  specialities: PropTypes.array,
  user: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

PatientFull.defaultProps = {
  showHead: true
}

export default PatientFull
