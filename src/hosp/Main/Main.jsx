import React from 'react'
import PropTypes from 'prop-types'

import { TSide, TTop, TLogin, merge } from 'tinput'

import Table from 'component/hosp/Table'
import HospList from 'component/hosp/HospList'
import PatientList from 'component/calls/PatientList'
import MedicForms from '../../component/MedicForms/MedicForms/MedicForms.jsx'
import styles from './styles.js'
import { Outlet } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      page: 'hosp',
      tools: [],
      caption: '',
      show: [],
      number: null,
      car: null,
      id: null
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
    this.onClick = this.onClick.bind(this)
    this.handleCloseMedicForms = this.handleCloseMedicForms.bind(this)
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
  onClick = id => {
    this.setState({ id: id })
  }
  handleCloseMedicForms = () => {
    this.setState({ id: null }) // или 0, в зависимости от ваших требований
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
          onClick={this.onClick}
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
    let caption = (
      <div style={style.caption.container}>
        {name}
        <div style={style.caption.content}>{this.state.caption}</div>
      </div>
    )

    return (
      <div style={style.main}>
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
        {/* {content} */}
        {this.state.id ? (
          <MedicForms onClose={this.handleCloseMedicForms} id={this.state.id} user={this.props.user}/> // Передаем обработчик закрытия
        ) : (
          content
        )}

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
  // store: PropTypes.object.isRequired,
  user: PropTypes.object,
  wait: PropTypes.any,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
}

export default Main
