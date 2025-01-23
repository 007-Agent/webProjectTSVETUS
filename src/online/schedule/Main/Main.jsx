import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import Header from '../Header'
import Schedule from '../Schedule'
//import Lgota from '../Lgota'

import styles from './styles.js'

class Main extends React.Component {
  render() {
    let style = merge(styles, this.props.style)

    return (
      <div style={style.container}>
        <Header style={style.header} />
        {
          <Schedule
            style={style.schedule}
            branches={this.props.branches}
            departments={this.props.departments}
            personal={this.props.personal}
            schedule={this.props.schedule}
          />
        }
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
  branches: PropTypes.array,
  departments: PropTypes.array,
  personal: PropTypes.array,
  schedule: PropTypes.array
}

export default Main
