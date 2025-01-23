import React from 'react'
import PropTypes from 'prop-types'

import { TPanel, TScroll, TText, TLoad, merge, post } from 'tinput'

import styles from './styles.js'

import PatientShort from 'component/PatientShort'
import PatientFull from 'component/PatientFull'

const COUNT = 20

class PatientList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: null,
      patients: [],
      index: -1,
      wait: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.refresh = this.refresh.bind(this)
    this.handlePatientClick = this.handlePatientClick.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    this.modified = true
    this.props.onTools([])
    this.props.onCaption('ПАЦИЕНТ')
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.props.onTools([
        { icon: 'close', onClick: this.close, active: this.state.index >= 0 }
      ])
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextState.patients !== this.state.patients ||
      nextState.index !== this.state.index ||
      nextState.wait !== this.state.wait
    )
  }

  refresh() {
    this.setState({ index: -1 }, () => {
      post({
        url: '/rest/pol/patient/search',
        data: { search: this.state.search, count: COUNT },
        sender: this,
        target: 'patients'
      })
    })
  }

  handleButtonClick() {
    this.refresh()
  }

  handleChange(event) {
    this.setState({
      search: event.value
    })
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.refresh()
    }
  }

  close() {
    this.setState({ index: -1 })
  }

  handlePatientClick(event) {
    this.setState({ index: event.index })
  }

  render() {
    let style = merge(styles, this.props.style)

    let content = []
    if (this.state.index < 0) {
      this.state.patients.forEach((v, i) => {
        content.push(
          <PatientShort
            key={i}
            index={i}
            patient={v}
            onClick={this.handlePatientClick}
          />
        )
      })
    } else {
      let patient = this.state.patients[this.state.index]
      content = (
        <PatientFull
          key={0}
          patient={patient}
          onClick={this.handlePatientClick}
          downloads={this.props.downloads}
        />
      )
    }

    return (
      <div style={style.container}>
        <TPanel style={style.panel}>
          {this.state.index < 0 ? (
            <TText
              style={style.input}
              label={'Поиск:'}
              name='search'
              placeholder='№ ИБ/ФИО'
              value={this.state.value}
              icon={'refresh'}
              onIcon={this.handleButtonClick}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />
          ) : null}
        </TPanel>

        <TScroll style={style.scroll}>{content}</TScroll>

        <TLoad show={this.state.wait} icon={'refresh'} />
      </div>
    )
  }
}

PatientList.propTypes = {
  style: PropTypes.object,
  source: PropTypes.string,
  downloads: PropTypes.any
}

export default PatientList
