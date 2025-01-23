import React from 'react'
import PropTypes from 'prop-types'

import {
  TPanel,
  TScroll,
  merge,
  post,
  isoDate,
  TDate,
  TTime,
  TIcon,
  download
} from 'tinput'

import Car from './Car'
import styles from './styles.js'

class Cars extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    this.state = {
      cars: [],
      showRoute: false,
      fromDate: isoDate(new Date(year, month, day - 1)),
      toDate: isoDate(new Date(year, month, day)),
      fromTime: '08:00:00',
      toTime: '07:59:59',
      wait: false
    }
    this.refresh = this.refresh.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
    this.handleRoute = this.handleRoute.bind(this)

    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
    this.handleChangeFromTime = this.handleChangeFromTime.bind(this)
    this.handleChangeToTime = this.handleChangeToTime.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.props.onTools([{ icon: 'refresh', onClick: this.refresh }])
    this.props.onCaption('СПИСОК АВТОМОБИЛЕЙ')
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleRoute(id) {
    if (this.props.onRoute) {
      this.props.onRoute(id)
    }
  }

  handleChangeFromDate(event) {
    this.setState({ fromDate: event.value })
  }

  handleChangeFromTime(event) {
    this.setState({ fromTime: event.value })
  }

  handleChangeToDate(event) {
    this.setState({ toDate: event.value })
  }

  handleChangeToTime(event) {
    this.setState({ toTime: event.value })
  }

  handleDownload() {
    let fileNameTo = 'ReportTransportPath.xlsx'
    let url =
      '/rest/report/transport/path?fileName=' +
      fileNameTo +
      '&dateFrom=' +
      this.state.fromDate +
      '&timeFrom=' +
      this.state.fromTime +
      '&dateTo=' +
      this.state.toDate +
      '&timeTo=' +
      this.state.toTime
    download(url, fileNameTo)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.wait !== this.state.wait) {
      let is = this.state.wait ? styles.wait : null
      let rt = this.state.wait ? 700 : null
      this.props.onTools([
        { icon: 'refresh', onClick: this.refresh, style: is, rotateTime: rt }
      ])
    }
  }

  refresh() {
    post({
      url: '/rest/help/cars',
      data: { query: { all: 1 } },
      sender: this,
      target: 'cars'
    })
  }

  render() {
    let style = merge(styles, this.props.style)

    let list = this.state.cars.map((v, i) => (
      <Car
        key={i}
        style={style.car}
        car={v}
        onRoute={this.handleRoute}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
      />
    ))

    let buttons = (
      <TIcon
        style={style.icon}
        name={'print'}
        timeout={7000}
        onClick={this.handleDownload}
      />
    )

    return (
      <div id='name' style={style.container}>
        <TPanel style={style.panel}>
          <TDate
            style={style.date}
            name={'fromDate'}
            label={'C:'}
            calendar={true}
            navigators={'month'}
            start={1}
            value={this.state.fromDate}
            onChange={this.handleChangeFromDate}
          />

          <TTime
            style={style.time}
            name={'fromTime'}
            value={this.state.fromTime}
            onChange={this.handleChangeFromTime}
          />

          <TDate
            style={style.date}
            name={'toDate'}
            label={'По:'}
            calendar={true}
            navigators={'month'}
            start={1}
            value={this.state.toDate}
            onChange={this.handleChangeToDate}
          />

          <TTime
            style={style.time}
            name='toTime'
            value={this.state.toTime}
            onChange={this.handleChangeToTime}
          />

          {buttons}
        </TPanel>

        <TScroll style={style.scroll}>
          <div style={style.list}>{list}</div>
        </TScroll>
      </div>
    )
  }
}

Cars.propTypes = {
  style: PropTypes.object,
  onRoute: PropTypes.func,
  onTools: PropTypes.func.isRequired,
  onCaption: PropTypes.func.isRequired,
  fromDate: PropTypes.string,
  toDate: PropTypes.string
}

export default Cars
