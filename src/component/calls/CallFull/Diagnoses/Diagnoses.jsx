import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, TText, merge, clone, post } from 'tinput'

import DiagnosisText from 'component/DiagnosisText'

import styles from './styles.js'

class Diagnoses extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.data = clone(this.props.data)
    this.state = {
      data: clone(this.props.data),
      modified: false
    }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.notify = this.notify.bind(this)
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.update()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  update() {
    if (this.props.onParams) {
      this.props.onParams({
        diagnosisCode: this.state.data ? this.state.data.diagnosisCode : null
      })
    }
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        save: save,
        cancel: cancel
      })
    }
    this.update()
  }

  cancel() {
    this.setState(
      {
        data: this.data,
        modified: false
      },
      () => {
        this.data = clone(this.data)
        this.notify()
      }
    )
  }

  save() {
    post({
      url: `/rest/${this.props.project}/diagnoses/update`,
      data: { data: this.state.data },
      sender: this,
      success: data => {
        this.setState(
          {
            data: data,
            modified: false
          },
          () => {
            this.data = clone(data)
            this.notify()
          }
        )
      }
    })
  }

  handleChange(event) {
    let data = clone(this.state.data)
    if (event.name === 'diagnosis') {
      data.diagnosisCode = event.value.code
      data.diagnosisName = event.value.name
    } else if (event.name === 'complication') {
      data.complicCode = event.value.code
      data.complicName = event.value.name
    }
    this.setState(
      {
        data: data,
        modified: true
      },
      () => {
        this.notify(this.save, this.cancel)
      }
    )
  }

  render() {
    let cs = this.props.style ? this.props.style.component : null
    let gs = this.props.style ? this.props.style.group : null

    let style = {
      diagnosis: styles.diagnosis,
      group: merge(styles.group, gs),
      component: merge(cs, styles.component)
    }

    return (
      <TGroup style={style.group} label={'Диагноз'}>
        <DiagnosisText
          style={style.diagnosis}
          name={'diagnosis'}
          label={'Код диагноза по МКБ10:'}
          value={{
            code: this.state.data.diagnosisCode,
            name: this.state.data.diagnosisName
          }}
          onChange={this.handleChange}
        />

        <DiagnosisText
          style={style.diagnosis}
          name={'complication'}
          label={'Код осложнения/Сопутствующий код по МКБ10:'}
          value={{
            code: this.state.data.complicCode,
            name: this.state.data.complicName
          }}
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='emergencyNum'
          label='Экстренное извещение №:'
          placeholder='*'
          value={this.state.data.emergencyNum}
          onChange={this.handleChange}
        />
      </TGroup>
    )
  }
}

Diagnoses.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onParams: PropTypes.func
}

Diagnoses.defaultProps = {
  project: 'help'
}

export default Diagnoses
