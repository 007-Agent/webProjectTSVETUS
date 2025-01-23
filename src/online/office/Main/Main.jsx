import React from 'react'
import PropTypes from 'prop-types'

import { TSide, merge } from 'tinput'

import Header from '../Header'
import Schedule from '../../schedule/Schedule'
import Landing from '../Landing'
import Entrance from '../Entrance'
import Profile from '../Profile'
import Patients from '../Patients'
import Policy from '../Policy'
import Privacy from '../Privacy'

import styles from './styles.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'landing',
      show: false
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.handleAgreed = this.handleAgreed.bind(this)
    this.handleEvent = this.handleEvent.bind(this)
  }

  handleHeaderClick() {
    this.setState({ show: true })
  }

  handleMenuClick(event) {
    if (event.item.name === 'close') {
      this.setState({ show: false })
    } else if (event.item.name === 'exit') {
      this.setState({
        show: false
      })
      if (this.props.onLogout) {
        this.props.onLogout()
      }
    } else {
      this.setState({
        show: false,
        page: event.item.name
      })
    }
  }

  handleUpdate() {
    if (this.props.onCheck) {
      this.props.onCheck()
    }
  }

  handlePage(event) {
    this.setState({ page: event.page })
  }

  handleAgreed(event) {
    if (event.agreed) {
      this.props.onCheck()
    } else {
      this.props.onLogout()
    }
  }

  handleEvent(event) {
    if (event.page) {
      this.setState({ page: event.page })
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let content = null
    let side = null

    if (this.props.user && this.props.user.id > 0) {
      if (this.props.user.agreed > 0) {
        side = (
          <TSide
            style={style.side}
            name={'side'}
            width={'320px'}
            items={[
              { name: 'landing', caption: 'Главная' },
              { name: 'profile', caption: 'Профиль' },
              { name: 'patients', caption: 'Пациенты' },
              { name: 'schedule', caption: 'Расписание' },
              { name: 'privacy', caption: 'Конфиденциальность' },
              { name: 'exit', caption: 'Выход' }
            ]}
            show={this.state.show}
            item={this.state.page}
            onClick={this.handleMenuClick}
          />
        )

        if (this.state.page === 'profile') {
          content = (
            <Profile user={this.props.user} onUpdate={this.handleUpdate} />
          )
        } else if (this.state.page === 'patients') {
          content = (
            <Patients
              source={'office'}
              specialities={this.props.specialities}
              user={this.props.user}
            />
          )
        } else if (this.state.page === 'schedule') {
          content = (
            <Schedule
              style={style.schedule}
              branches={this.props.branches}
              departments={this.props.departments}
              personal={this.props.personal}
              schedule={this.props.schedule}
            />
          )
        } else if (this.state.page === 'privacy') {
          content = <Privacy />
        } else {
          content = <Landing user={this.props.user} onPage={this.handlePage} />
        }
      } else {
        content = <Policy user={this.props.user} onChange={this.handleAgreed} />
      }
    } else {
      side = (
        <TSide
          style={style.side}
          name={'side'}
          width={'320px'}
          items={[
            { name: 'entrance', caption: 'Вход' },
            { name: 'schedule', caption: 'Расписание' },
            { name: 'privacy', caption: 'Конфиденциальность' }
          ]}
          show={this.state.show}
          item={this.state.page}
          onClick={this.handleMenuClick}
        />
      )

      if (this.state.page === 'schedule') {
        content = (
          <Schedule
            style={style.schedule}
            branches={this.props.branches}
            departments={this.props.departments}
            personal={this.props.personal}
            schedule={this.props.schedule}
          />
        )
      } else if (this.state.page === 'privacy') {
        content = <Privacy />
      } else {
        content = (
          <Entrance store={this.props.store} onEvent={this.handleEvent} />
        )
      }
    }

    return (
      <div style={style.container}>
        {side}

        <Header
          style={style.header}
          name={'header'}
          user={this.props.user}
          page={this.state.page}
          device={this.props.device}
          onClick={this.handleHeaderClick}
        />

        {content}
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
  specialities: PropTypes.array,
  branches: PropTypes.array,
  departments: PropTypes.array,
  personal: PropTypes.array,
  schedule: PropTypes.array,
  device: PropTypes.string,
  onLogout: PropTypes.func,
  onCheck: PropTypes.func
}

export default Main
