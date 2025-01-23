import React from 'react'
import PropTypes from 'prop-types'

import { TSide, TTop, TLogin, merge } from 'tinput'

import Calls from 'component/calls/Calls'
import PatientList from 'component/calls/PatientList'
import Cards from '../Cards'
import Cars from '../Cars'
import Schedule from '../Schedule'
import MapContainer from '../MapContainer'
import Routes from '../Routes'

import { DEPARTMENTS, SCHEDULE_TYPES } from 'osmp/config'

import styles from './styles.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      page: 'osmp',
      tools: [],
      caption: '',
      show: [],
      number: null,
      car: null
    }
    this.handleMenu = this.handleMenu.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleTools = this.handleTools.bind(this)
    this.handleCaption = this.handleCaption.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.connected = this.connected.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
    this.handleCloseRoute = this.handleCloseRoute.bind(this)
    this.handleFail = this.handleFail.bind(this)
  }

  componentDidMount() {
    this.props.onCheck()
  }

  handleFail() {}

  handleMenu(event) {
    if (event.name === 'topMenu' && event.icon === 'menu') {
      this.setState({ menu: true })
    } else if (event.name === 'sideMenu') {
      this.setState({ menu: false })
      if (event.item.name === 'exit') {
        this.props.onLogout()
      } else if (event.item.name === 'close') {
      } else {
        this.setState({ page: event.item.name })
      }
    }
  }

  handleLogin(event) {
    if (event.button === 'submit') {
      this.props.onLogin(event.value.username, event.value.password)
    }
  }

  handleTools(tools) {
    this.setState({ tools: tools })
  }

  handleCaption(caption) {
    this.setState({ caption: caption })
  }

  handleCheck() {
    this.props.onCheck()
  }

  handleRoute(car) {
    this.setState({
      page: 'routes',
      car: car
    })
  }

  handleCloseRoute() {
    this.setState({
      page: 'cars',
      imei: null
    })
  }

  connected() {
    return this.props.user && this.props.user.id > 0
  }

  render() {
    let opacity = { opacity: '0.3', pointerEvents: 'none' }
    if (this.props.user && this.props.user.id > 0) {
      opacity = { opacity: '1' }
    }

    let style = merge(styles, this.props.style)

    let content = null
    if (this.state.page === 'osmp') {
      content = (
        <Calls
          style={opacity}
          type={'osmp'}
          user={this.props.user}
          onTools={this.handleTools}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'pnd') {
      content = (
        <Calls
          style={opacity}
          type={'pnd'}
          user={this.props.user}
          onTools={this.handleTools}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'cards') {
      content = (
        <Cards
          user={this.props.user}
          onTools={this.handleTools}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'cars') {
      content = (
        <Cars
          onTools={this.handleTools}
          onRoute={this.handleRoute}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'patient') {
      content = (
        <PatientList
          onFail={this.handleFail}
          onTools={this.handleTools}
          downloads={false}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'scheduleTransport') {
      content = (
        <Schedule
          style={opacity}
          onTools={this.handleTools}
          onFail={this.handleFail}
          user={this.props.user}
          depId={DEPARTMENTS.TRANSPORT}
          type={SCHEDULE_TYPES.OSMP}
          caption={'Расписание ТО'}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'scheduleOsmp') {
      content = (
        <Schedule
          style={opacity}
          onTools={this.handleTools}
          onFail={this.handleFail}
          user={this.props.user}
          depId={DEPARTMENTS.OSMP}
          type={SCHEDULE_TYPES.OSMP}
          caption={'Расписание ОСМП'}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'schedulePnd') {
      content = (
        <Schedule
          style={opacity}
          onTools={this.handleTools}
          onFail={this.handleFail}
          user={this.props.user}
          depId={null}
          type={SCHEDULE_TYPES.PND}
          caption={'Расписание ПНД'}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'map') {
      content = (
        <MapContainer
          onTools={this.handleTools}
          onFail={this.handleFail}
          show={this.state.show}
          user={this.props.user}
          style={opacity}
          onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'routes') {
      // console.log('state ' + this.state.car.number)
      content = (
        <Routes
          car={this.state.car}
          onClose={this.handleCloseRoute}
          onTools={this.handleTools}
          onCaption={this.handleCaption}
          onRoute={this.handleRoute}
        />
      )
    }

    let items = [
      { name: 'osmp', caption: 'Вызовы ОСМП' },
      { name: 'pnd', caption: 'Вызовы ПНД' },
      { name: 'cards', caption: 'Все вызовы' },
      {},
      { name: 'patient', caption: 'Пациент' },
      {},
      { name: 'scheduleOsmp', caption: 'Расписание ОСМП' },
      { name: 'schedulePnd', caption: 'Расписание ПНД' },
      { name: 'scheduleTransport', caption: 'Расписание ТО' },
      {},
      { name: 'map', caption: 'Карта' },
      { name: 'cars', caption: 'Автомобили' },
      {},
      { name: 'exit', caption: 'Выход' }
    ]

    let name = this.connected() ? (
      <div style={style.caption.username}>{this.props.user.name}</div>
    ) : null
    let caption = (
      <div style={style.caption.container}>
        {name}
        <div style={style.caption.content}>{this.state.caption}</div>
      </div>
    )

    return (
      <div>
        <TSide
          style={style.side}
          name={'sideMenu'}
          show={this.state.menu}
          items={items}
          item={this.state.page}
          onClick={this.handleMenu}
        />

        <TTop
          style={style.top}
          name={'topMenu'}
          caption={caption}
          tools={this.state.tools}
          onClick={this.handleMenu}
        />

        {content}

        <TLogin
          name={'loginForm'}
          wait={this.props.wait}
          show={!this.connected()}
          error={this.props.error}
          onLogin={this.handleLogin}
          onClear={this.props.onClear}
          labels={{
            username: 'Имя пользователя:',
            password: 'Пароль:',
            submit: 'Вход',
            cancel: 'Отмена'
          }}
          placeholders={{
            username: '',
            password: ''
          }}
        />
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
  user: PropTypes.object,
  wait: PropTypes.any,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
}

export default Main
