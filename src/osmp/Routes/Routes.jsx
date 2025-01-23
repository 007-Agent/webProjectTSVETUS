import React from 'react'
import PropTypes from 'prop-types'

import {
  TPanel,
  TScroll,
  TDate,
  TTime,
  merge,
  post,
  isoDate,
  TText
} from 'tinput'

import styles from './styles.js'

class Routes extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      fromDate: isoDate(new Date()),
      toDate: isoDate(new Date()),
      fromTime: '00:00:00',
      toTime: '23:59:59',
      wait: true,
      error: false,
      size: {
        width: 0,
        height: 0
      },
      path: 0
    }
    this.handleResize = this.handleResize.bind(this)
    this.refresh = this.refresh.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getCoordinates = this.getCoordinates.bind(this)
    this.getKilometres = this.getKilometres.bind(this)
    this.init = this.init.bind(this)
    this.close = this.close.bind(this)
    this.paint = this.paint.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(this.init)
    }
    this.props.onTools([
      { icon: 'refresh', onClick: this.refresh },
      { icon: 'close', onClick: this.close }
    ])
    this.props.onCaption('КАРТА МАРШРУТОВ')
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
    if (this.map) {
      this.map.destroy()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.wait !== this.state.wait) {
      let is = this.state.wait ? styles.wait : null
      let rt = this.state.wait ? 700 : null
      this.props.onTools([
        { icon: 'refresh', onClick: this.refresh, style: is, rotateTime: rt },
        { icon: 'close', onClick: this.close }
      ])
    }
  }

  handleResize(event) {
    this.setState({ size: event.size }, () => {
      if (this.map) {
        this.map.container.fitToViewport()
      }
    })
  }

  handleChange(event) {
    this.setState({ [event.name]: event.value })
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  paint(coordinates) {
    if (!coordinates || !coordinates.length) return

    let points = []
    let dates = []
    let n = 100
    let cosD = 0
    let l = 0
    let latt = coordinates[0].gpsLatt
    let long = coordinates[0].gpsLong

    points.push([latt, long])
    coordinates.forEach(v => {
      cosD =
        Math.sin(latt) * Math.sin(v.gpsLatt) +
        Math.cos(latt) * Math.cos(v.gpsLatt) * Math.cos(long - v.gpsLong)
      l = 6363.564 * Math.acos(cosD)
      if (l > n) {
        points.push([v.gpsLatt, v.gpsLong])
        dates.push([v.date])
        latt = v.gpsLatt
        long = v.gpsLong
      }
      cosD = 0
      l = 0
    })

    points.forEach((v, i) => {
      this.map.geoObjects.add(
        new ymaps.Placemark(
          v,
          {
            balloonContent: dates[i]
          },
          {
            preset: 'islands#blueCircleDotIconWithCaption'
          }
        )
      )
    })

    let trek = []
    coordinates.forEach(v => {
      trek.push([v.gpsLatt, v.gpsLong])
    })

    let myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: 'LineString',
        coordinates: trek
      }
    })

    this.map.geoObjects.add(myGeoObject)
  }

  getCoordinates() {
    this.setState({ error: false, wait: false })
    if (this.state.wait) return
    post({
      url: '/rest/help/coordinates',
      data: {
        number: this.props.car?.imei,
        from: this.state.fromDate + 'T' + this.state.fromTime,
        to: this.state.toDate + 'T' + this.state.toTime
      },
      sender: this,
      success: response => {
        this.paint(response.list)
        if (response.list && response.list.length > 0) {
          this.paint(response.list)
        }
      }
    })
  }

  getKilometres() {
    this.setState({ error: false, wait: false })
    if (this.state.wait) return
    post({
      url: '/rest/help/path',
      data: {
        number: this.props.car?.imei,
        from: this.state.fromDate + 'T' + this.state.fromTime,
        to: this.state.toDate + 'T' + this.state.toTime
      },
      sender: this,
      success: response => {
        this.setState({ path: response })
      }
    })
  }

  init() {
    if (!this.map) {
      this.map = new ymaps.Map(
        'map',
        {
          center: [55.76, 37.64],
          zoom: 11
        },
        {
          searchControlProvider: 'yandex#search'
        }
      )
      this.refresh()
    }
  }

  refresh() {
    this.getKilometres()
    if (this.map) {
      if (this.map.geoObjects) {
        this.map.geoObjects.removeAll()
      }
      this.getCoordinates()
    }
  }

  render() {
    console.log('CAR', this.props.car)

    let style = merge(styles, this.props.style)

    let ms = merge(style.map, {
      width: this.state.size.width + 'px',
      height: this.state.size.height + 'px'
    })
    return (
      <form name='auto'>
        <div style={style.container}>
          <TPanel style={style.panel}>
            <TText
              style={style.number}
              name={'car'}
              label={'№: '}
              value={this.props.car?.number}
              readOnly={true}
            />

            <TText
              style={style.path}
              name={'kilometres'}
              label={'Расстояние (км): '}
              value={this.state.path}
              readOnly={true}
            />

            <TDate
              style={style.date}
              name={'fromDate'}
              label={'C:'}
              calendar={true}
              navigators={'month'}
              start={1}
              value={this.state.fromDate}
              onChange={this.handleChange}
            />

            <TTime
              style={style.time}
              name={'fromTime'}
              value={this.state.fromTime}
              onChange={this.handleChange}
            />

            <TDate
              style={style.date}
              name={'toDate'}
              label={'По:'}
              calendar={true}
              navigators={'month'}
              start={1}
              value={this.state.toDate}
              onChange={this.handleChange}
            />

            <TTime
              style={style.time}
              name='toTime'
              value={this.state.toTime}
              onChange={this.handleChange}
            />
          </TPanel>

          <TScroll style={style.scroll} onChange={this.handleResize}>
            <div id='map' style={ms}></div>
          </TScroll>
        </div>
      </form>
    )
  }
}

Routes.propTypes = {
  style: PropTypes.object,
  car: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onTools: PropTypes.func.isRequired,
  onCaption: PropTypes.func.isRequired
}

export default Routes
