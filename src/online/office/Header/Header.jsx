import React from 'react'
import PropTypes from 'prop-types'

import { TTop, TIcon, merge, Sizer } from 'tinput'

import styles from './styles.js'

import icons from 'online/resources/icons.js'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: 0 }
    this.sizer = new Sizer(this)
  }

  componentWillUnmount() {
    this.sizer.free()
  }

  render() {
    let style = merge(styles, this.props.style)

    let title = null
    if (this.state.width < 520) {
      title = (
        <div style={style.title.container}>
          <div style={style.title.content}>ФГБУ ДМЦ</div>
        </div>
      )
    } else if (this.state.width < 720) {
      title = (
        <div style={style.title.container}>
          <div style={style.title.content}>ФГБУ ДМЦ УДП РФ</div>
        </div>
      )
    } else {
      title = (
        <div style={style.title.container}>
          <div style={style.title.header}>
            ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ
          </div>
          <div style={style.title.content}>ДЕТСКИЙ МЕДИЦИНСКИЙ ЦЕНТР</div>
          <div style={style.title.footer}>
            УПРАВЛЕНИЯ ДЕЛАМИ ПРЕЗИДЕНТА РОССИЙСКОЙ ФЕДЕРАЦИИ
          </div>
        </div>
      )
    }

    let home = <TIcon key={'home'} style={style.home.icon} icon={icons.logo} />

    let icon = 'menu'

    return (
      <TTop
        style={style.top}
        caption={title}
        tools={[{ icon: home, onClick: this.goHome }]}
        name={this.props.name}
        icon={icon}
        onClick={this.props.onClick}
      />
    )
  }
}

Header.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func
}

export default Header
