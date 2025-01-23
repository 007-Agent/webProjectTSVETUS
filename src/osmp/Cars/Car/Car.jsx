import React from 'react'
import PropTypes from 'prop-types'

import {
  TText,
  TCheck,
  TIcon,
  merge,
  post,
  strDate,
  cutTime,
  download
} from 'tinput'

import Ref from 'component/Ref'

import styles from './styles.js'

class Car extends React.Component {
  constructor(props, context, fromDate, toDate) {
    super(props)
    this.state = {
      car: props.car,
      modified: false,
      wait: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRefChange = this.handleRefChange.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)

    this.handleRoute = this.handleRoute.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(old) {
    if (old.car !== this.props.car) {
      this.setState({ car: this.props.car, modified: false, wait: false })
    }
  }

  handleChange(event) {
    let car = {
      ...this.state.car,
      [event.name]: event.value
    }
    this.setState({ car: car, modified: true })
  }

  handleRefChange(event) {
    let car = {
      ...this.state.car,
      [event.name]: event.item
    }
    this.setState({ car: car, modified: true })
  }

  handleRoute() {
    if (this.props.onRoute) {
      this.props.onRoute(this.state.car)
    }
  }
  handleDownload() {
    let fileNameTo = 'ReportTransportTurn.xlsx'
    let url = `/rest/report/transport/turn?fileName=${fileNameTo}&dateFrom=${this.props.fromDate}&dateTo=${this.props.toDate}&carId=${this.props.car.id}`
    console.log(url)
    download(url, fileNameTo)
  }
  save() {
    post({
      url: '/rest/help/car/update',
      data: { car: this.state.car },
      sender: this,
      success: data => {
        this.setState({ data: data, modified: false })
      }
    })
  }

  delete() {
    post({
      url: '/rest/help/car/delete',
      data: { car: this.state.car },
      sender: this,
      success: data => {
        this.setState({ data: data, modified: false })
      }
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let button = null
    if (this.props.empty) {
      button = (
        <TIcon
          style={style.iconSave}
          name={'add'}
          wait={this.state.wait}
          onClick={this.save}
        />
      )
    } else {
      if (this.state.modified) {
        button = (
          <TIcon
            style={style.iconSave}
            name={'save'}
            wait={this.state.wait}
            onClick={this.save}
          />
        )
      } else {
        button = this.props.showDelete ? (
          <TIcon
            style={style.iconDelete}
            name={'delete'}
            wait={this.state.wait}
            onClick={this.delete}
          />
        ) : null
      }
    }

    if (this.state.car.access < 3) {
      return <div></div>
    } else {
      let crewId = this.state.car.crew ? this.state.car.crew.id : null

      let lastDate = this.state.car.lastDate
        ? strDate(this.state.car.lastDate) +
          ' ' +
          cutTime(this.state.car.lastDate)
        : '-'

      return (
        <div style={style.container}>
          <TText
            style={style.number}
            value={this.state.car.number}
            name={'number'}
            label={'№:'}
            onChange={this.handleChange}
          />

          <Ref
            style={style.crew}
            name={'crew'}
            table={'ref_crew'}
            label={'Бригада:'}
            value={crewId}
            onChange={this.handleRefChange}
          />

          <Ref
            style={style.type}
            name={'type'}
            table={'ref_car_type'}
            label={'Тип:'}
            value={this.state.car.type}
            onChange={this.handleChange}
          />

          <TText
            style={style.color}
            value={this.state.car.color}
            name={'color'}
            label={'Цвет:'}
            onChange={this.handleChange}
          />

          <TText
            style={style.imei}
            value={this.state.car.imei}
            name={'imei'}
            label={'IMEI:'}
            onChange={this.handleChange}
          />

          <TText
            style={style.phone}
            value={this.state.car.phone}
            name={'phone'}
            label={'Тел.:'}
            onChange={this.handleChange}
          />

          <TCheck
            style={style.active}
            value={this.state.car.active}
            name={'active'}
            label={'Карта:'}
            checked={1}
            unchecked={0}
            onChange={this.handleChange}
          />

          <div style={style.text}>{lastDate}</div>

          <TIcon
            style={style.iconSave}
            name={'car'}
            wait={this.state.wait}
            onClick={this.handleRoute}
          />

          <TIcon
            style={style.iconPrint}
            name={'print'}
            timeout={7000}
            onClick={this.handleDownload}
          />

          {button}
        </div>
      )
    }
  }
}

Car.propTypes = {
  style: PropTypes.object,
  car: PropTypes.object.isRequired,
  empty: PropTypes.any,
  showDelete: PropTypes.any,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  onRoute: PropTypes.func
}

export default Car
