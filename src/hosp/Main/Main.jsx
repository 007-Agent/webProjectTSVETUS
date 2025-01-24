import React from 'react'
import PropTypes from 'prop-types'

import { TSide, TTop, TLogin, merge } from 'tinput'

import Table from 'component/hosp/Table'
import HospList from 'component/hosp/HospList'
import PatientList from 'component/calls/PatientList'

import styles from './styles.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false, //
      page: 'hosp', // текущая страница
      tools: [], // инструменты
      caption: '', // заголовок страницы
      show: [], // показываемые инструменты
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
  } // передаём в redux логин и пароль

  handleTools(tools) {
    this.setState({ tools: tools })
  }

  handleCaption(caption) {
    //
    this.setState({ caption: caption })
  }

  handleCheck() {
    this.props.onCheck() // проверяем наличие пользователя_ в redux
  }

  handleRoute(car) {
    // управляет состоянием изменения страницы
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
    return this.props.user && this.props.user.id > 0 // авторизован ли пользователь)
  }

  render() {
    let opacity = { opacity: '0.3', pointerEvents: 'none' }
    if (this.props.user && this.props.user.id > 0) {
      opacity = { opacity: '1' }
    }

    let style = merge(styles, this.props.style)

    let content = null

    if (this.state.page === 'table') {
      content = (
        <Table
          // style={opacity}
          // type={'osmp'}
          user={this.props.user}
          // onTools={this.handleTools}
          // onCaption={this.handleCaption}
        />
      )
    } else if (this.state.page === 'hosp') {
      content = (
        <HospList
          style={opacity}
          user={this.props.user}
          onTools={this.handleTools}
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
    }

    let items = [
      { name: 'hosp', caption: 'Статкарта' },
      {},
      { name: 'patient', caption: 'Пациент' },
      {},
      { name: 'table', caption: 'Коечный фонд' },
      {},
      { name: 'exit', caption: 'Выход' }
    ]

    let name = this.connected() ? (
      <div style={style.caption.username}>{this.props.user.name}</div>
    ) : null
    let caption = // получаем заголовок страницы
      (
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
          caption={caption} // заголовок страницы
          tools={this.state.tools}
          onClick={this.handleMenu}
        />

        {content}

        <TLogin // вызывает форму для авторизации в интерфейс)
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
