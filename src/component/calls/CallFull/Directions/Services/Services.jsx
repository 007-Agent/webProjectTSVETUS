import React from 'react'
import PropTypes from 'prop-types'

import { clone, TIcon, TGroup, merge } from 'tinput'

import Service from 'component/Service'
import ServiceSelector from 'component/ServiceSelector'

import styles from './styles.js'

class Services extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.data = props.data
    this.state = {
      id: props.id,
      whereId: this.props.whereId
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChangeParams = this.handleChangeParams.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleChange(data) {
    this.props.onChange({
      index: this.props.index,
      data: data
    })
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

  handleDelete(event) {
    let index = event.data
    if (index >= 0) {
      let data = clone(this.props.data)
      data.splice(index, 1)
      this.handleChange(data)
    }
  }

  handleSelect(event) {
    if (event.service && event.service.code) {
      let service = {
        ...event.service,
        hlpId: this.state.id,
        whereId: this.state.whereId
      }
      let data = clone(this.props.data)
      data.push(service)
      this.handleChange(data)
    }
  }

  handleUpdate(event) {
    let data = clone(this.props.data)
    data[event.index] = event.service
    this.handleChange(data)
  }

  render() {
    let style = merge(styles, this.props.style)

    let params = {
      date: this.props.callDate,
      whereId: this.state.whereId,
      patientId: this.props.patientId,
      departmentId: this.props.departmentId,
      diagnosisCode: this.props.diagnosisCode
    }

    let list = []
    this.props.data.forEach((v, i) => {
      list.push(
        <div key={i} style={style.box}>
          <Service
            style={style.service}
            service={v}
            onChange={this.handleUpdate}
            index={i}
            hideExp={this.props.hideExp}
            showDep={this.props.showDep}
            readOnly={true}
            params={params}
          />
          <TIcon
            style={style.iconDelete}
            name={'delete'}
            onClick={this.handleDelete}
            data={i}
          />
        </div>
      )
    })

    let label =
      this.props.caption === null || this.props.caption === undefined
        ? 'Услуги'
        : this.props.caption

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
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  hideExp: PropTypes.any,
  caption: PropTypes.string,
  showDep: PropTypes.any,
  index: PropTypes.number.isRequired,
  diagnosisCode: PropTypes.string
}

export default Services
