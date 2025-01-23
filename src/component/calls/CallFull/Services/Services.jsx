import React from 'react'
import PropTypes from 'prop-types'

import { TIcon, TGroup, merge, clone, post } from 'tinput'

import Service from 'component/Service'
import ServiceSelector from 'component/ServiceSelector'

import styles from './styles.js'

class Services extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.data = props.data
    this.state = {
      id: props.id,
      whereId: props.whereId,
      data: clone(props.data),
      modified: false
    }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeParams = this.handleChangeParams.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        save: save,
        cancel: cancel
      })
    }
  }

  cancel() {
    this.setState(
      {
        data: clone(this.data),
        modified: false
      },
      () => {
        this.notify()
      }
    )
  }

  save() {
    post({
      url: '/rest/help/services/update',
      data: { id: this.state.id, data: this.state.data },
      sender: this,
      success: data => {
        this.setState(
          {
            data: clone(data),
            modified: false
          },
          () => {
            this.data = data
            this.notify()
          }
        )
      }
    })
  }

  handleChange(data) {
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

  handleDelete(event) {
    let index = event.data
    if (index >= 0) {
      let data = clone(this.state.data)
      data.splice(index, 1)
      this.handleChange(data)
    }
  }

  handleSelect(event) {
    if (event.service && event.service.code) {
      let service = {
        ...event.service,
        hlpId: this.state.id
      }
      let data = clone(this.state.data)
      data.push(service)
      this.handleChange(data)
    }
  }

  handleChangeParams(event) {
    if (event.params && event.params.whereId >= 0) {
      this.setState({ whereId: event.params.whereId })
      let data = clone(this.state.data)
      if (data && data.length > 0) {
        data.forEach(v => (v.whereId = event.params.whereId))
        this.handleChange(data)
      }
    }
  }

  handleUpdate(event) {
    let data = clone(this.state.data)
    data[event.index] = event.service
    this.handleChange(data)
  }

  render() {
    let style = merge(styles, this.props.style)

    let label =
      this.props.caption === null || this.props.caption === undefined
        ? 'Услуги'
        : this.props.caption

    if (!this.props.diagnosisCode) {
      return (
        <TGroup style={style.group} label={label}>
          <div style={style.text}>
            {' '}
            {'Для ввода услуг необходимо задать диагноз!'}{' '}
          </div>
        </TGroup>
      )
    }

    let params = {
      date: this.props.callDate,
      whereId: this.state.whereId,
      patientId: this.props.patientId,
      departmentId: this.props.departmentId,
      diagnosisCode: this.props.diagnosisCode,
      changeReasonId: this.props.changeReasonId
    }

    let list = []
    this.state.data.forEach((v, i) => {
      list.push(
        <div key={i} style={style.box}>
          <Service
            style={style.service}
            service={v}
            index={i}
            hideExp={this.props.hideExp}
            showDep={this.props.showDep}
            readOnly={true}
            params={params}
            onChange={this.handleUpdate}
          />
          <TIcon
            style={style.iconDelete}
            name={'delete'}
            data={i}
            onClick={this.handleDelete}
          />
        </div>
      )
    })

    return (
      <TGroup style={style.group} label={label}>
        {list}
        <ServiceSelector
          style={style.selector}
          params={params}
          onSelect={this.handleSelect}
          onChange={this.handleChangeParams}
        />
      </TGroup>
    )
  }
}

Services.propTypes = {
  id: PropTypes.number.isRequired,
  callDate: PropTypes.any.isRequired,
  whereId: PropTypes.number.isRequired,
  patientId: PropTypes.number.isRequired,
  departmentId: PropTypes.number,
  diagnosisCode: PropTypes.string,
  changeReasonId: PropTypes.number,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  hideExp: PropTypes.any,
  caption: PropTypes.string,
  showDep: PropTypes.any
}

export default Services
