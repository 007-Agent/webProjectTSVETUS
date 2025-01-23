import React from 'react'
import PropTypes from 'prop-types'

import {
  TMail,
  TInput,
  TButton,
  TResponse,
  merge,
  clone,
  TScroll
} from 'tinput'

import styles from './styles.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleEvent = this.handleEvent.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(event) {
    this.setState({
      ...clone(this.state),
      [event.name]: event.value
    })
  }

  handleSubmit() {
    if (this.props.onLogin) {
      this.props.onLogin(this.state.username, this.state.password)
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleEvent(event) {
    if (this.props.onEvent) {
      this.props.onEvent({ page: event.name })
    }
  }

  handleClear(event) {
    if (this.props.onClear) {
      this.props.onClear()
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    return (
      <div style={style.container}>
        <TMail
          style={style.input}
          name={'username'}
          placeholder={'E-mail:'}
          value={this.state.username}
          layout={'top'}
          onKeyDown={this.handleKeyPress}
          onChange={this.handleChange}
        />

        <TInput
          style={style.input}
          name={'password'}
          placeholder={'Пароль:'}
          value={this.state.password}
          type={'password'}
          layout={'top'}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          onValidate={e => {
            return e.value && e.value.length >= 8
          }}
        />

        <TResponse
          message={this.props.message}
          error={this.props.error}
          onClose={this.handleClear}>
          <TButton
            style={style.button}
            name={'submit'}
            onClick={this.handleSubmit}>
            {'Войти'}
          </TButton>
        </TResponse>

        <TButton
          style={style.schedule}
          name={'schedule'}
          onClick={this.handleEvent}>
          {'Расписание приема'}
        </TButton>

        <TButton
          style={style.schedule}
          name={'privacy'}
          onClick={this.handleEvent}>
          {'Конфиденциальность'}
        </TButton>
      </div>
    )
  }
}

Login.propTypes = {
  style: PropTypes.object,
  store: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onEvent: PropTypes.func
}

export default Login
