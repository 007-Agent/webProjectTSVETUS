import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, download, merge, clone, post, compare } from 'tinput'

import Address from 'component/calls/Address'
import State from 'component/calls/State'
import MetaData from 'component/MetaData'

import Patient from './Patient'
import Times from './Times'
import Results from './Results'
import Contacts from './Contacts'
import Persons from './Persons'
import Complaints from './Complaints'
import Services from './Services'
import CallType from './CallType'
import Distances from './Distances'
import Diagnoses from './Diagnoses'
import Measures from './Measures'
import Hospitalization from './Hospitalization'
import Accident from './Accident'
import Common from './Common'
import MetaTable from './MetaTable'
import History from './History'
import Actives from './Actives'
import Directions from './Directions'

import Saver from '../../Saver'

import styles from './styles.js'

const TIMEOUT = 10 * 1000

class CallFull extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      params: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.getCall = this.getCall.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.print = this.print.bind(this)
    this.handleHistory = this.handleHistory.bind(this)
    this.clear = this.clear.bind(this)
    this.connected = this.connected.bind(this)
    this.handleParams = this.handleParams.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.onTools) {
      this.props.onTools([{ icon: 'close', onClick: this.handleClose }])
    }
    this.getCall()
  }

  componentWillUnmount() {
    this.mounted = false
    if (this.props.onTools) {
      this.props.onTools([])
    }
    clearTimeout(this.timer)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !compare(this.props.user, nextProps.user) ||
      !compare(this.state.tasks, nextState.tasks) ||
      !compare(this.state.params, nextState.params) ||
      !compare(this.props.call, nextProps.call) ||
      !compare(this.state.call, nextState.call)
    )
  }

  connected() {
    return this.props.user && this.props.user.id > 0
  }

  clear() {
    if (this.mounted) {
      this.setState({ tasks: [] })
    }
  }

  handleIconClick(id) {
    this.props.showMap(id)
  }

  getCall() {
    clearTimeout(this.timer)
    if (this.connected()) {
      post({
        url: '/rest/help/call',
        data: { id: this.props.call.id },
        sender: this,
        success: response => {
          this.setState({ call: response })
        },
        fail: () => {
          this.timer = setTimeout(() => {
            this.getCall()
          }, TIMEOUT)
        }
      })
    } else {
      this.timer = setTimeout(() => {
        this.getCall()
      }, TIMEOUT)
    }
  }

  print() {
    let id = this.props.call.id
    let fileName = 'f110_' + id + '.pdf'
    download(
      '/rest/help/document?id=' +
        id +
        '&code=osmp.form.110&format=pdf&name=' +
        fileName,
      fileName
    )
  }

  handleClose() {
    if (this.props.onClose && this.state.tasks.length === 0) {
      this.props.onClose()
    }
  }

  handleChange(task) {
    //let changeReasonId = clone(this.state.changeReasonId)
    let newTasks = clone(this.state.tasks)
    let oldTask = this.state.tasks.find(v => {
      return v.name === task.name
    })
    if (task.save && task.cancel) {
      if (oldTask === undefined) {
        newTasks.push(task)
      }
    } else {
      newTasks.forEach((v, i) => {
        if ((task.name = v.name)) {
          v.save = null
          v.cancel = null
        }
      })
    }
    this.setState({ tasks: newTasks })
  }

  handleHistory() {}

  handleParams(event) {
    let params = {
      ...clone(this.state.params),
      ...event
    }
    this.setState({ params: params })
  }

  render() {
    let style = merge(styles, this.props.style)
    let change = null

    if (this.props.call === 'services') {
      console.log('Entered ' + this.props.call.changeReasonId)
      change = this.props.call.changeReasonId
      //return <Text>Выберите причину смены вида оплаты</Text>
    }
    let content = null
    //console.log('CALLFULL ' + JSON.stringify(this.props) + ' name ' + JSON.stringify(this.state) + ' changeReasonId ')
    let pnd = ['pnd', 'pndmob'].indexOf(this.props.type) >= 0

    if (this.state.call) {
      content = (
        <div style={style.container}>
          <Saver tasks={this.state.tasks} onClear={this.clear} />

          <State call={this.state.call} onClick={this.handleClose} />
          <Persons call={this.state.call} />
          <CallType call={this.state.call} />
          <Address call={this.state.call} iconClick={this.handleIconClick} />
          <Patient call={this.state.call} />

          <Contacts
            style={style.data}
            data={this.state.call.contacts}
            name={'contacts'}
            onChange={this.handleChange}
          />

          <Times
            style={style.data}
            data={this.state.call.times}
            name={'times'}
            onChange={this.handleChange}
          />

          <Distances
            style={style.data}
            data={this.state.call.distances}
            name={'distances'}
            onChange={this.handleChange}
          />

          <Results
            style={style.data}
            data={this.state.call.results}
            name={'results'}
            onChange={this.handleChange}
          />

          <Complaints
            style={style.data}
            id={this.state.call.id}
            data={this.state.call.complaints}
            name={'complaints'}
            onChange={this.handleChange}
          />

          {pnd ? null : (
            <Common
              style={style.data}
              data={this.state.call.common}
              name={'common'}
              onChange={this.handleChange}
            />
          )}

          {pnd ? null : (
            <Accident
              style={style.data}
              data={this.state.call.accident}
              name={'accident'}
              onChange={this.handleChange}
            />
          )}

          <MetaData
            style={style.data}
            data={this.state.call.symptoms}
            name={'symptoms'}
            type={this.props.type}
            onChange={this.handleChange}
            caption={'Жалобы'}
          />

          <MetaData
            style={style.data}
            data={this.state.call.anamnesis}
            name={'anamnesis'}
            type={this.props.type}
            onChange={this.handleChange}
            caption={'Анамнез'}
          />

          <MetaData
            style={style.data}
            data={this.state.call.objectives}
            name={'objectives'}
            type={this.props.type}
            onChange={this.handleChange}
            caption={'Объективные данные'}
          />

          <MetaData
            style={style.data}
            data={this.state.call.status}
            name={'status'}
            type={this.props.type}
            onChange={this.handleChange}
            caption={'Локальный статус'}
          />

          <Diagnoses
            style={style.data}
            data={this.state.call.diagnoses}
            name={'diagnoses'}
            onParams={this.handleParams}
            onChange={this.handleChange}
          />

          <Services
            style={style.data}
            id={this.state.call.id}
            callDate={this.state.call.callDate}
            whereId={1}
            patientId={this.state.call.patientId}
            departmentId={this.state.call.departmentId}
            diagnosisCode={this.state.params.diagnosisCode}
            data={this.state.call.services}
            name={'services'}
            onChange={this.handleChange}
          />

          <Measures
            style={style.data}
            data={this.state.call.measures}
            name={'measures'}
            onChange={this.handleChange}
          />

          <MetaData
            style={style.data}
            data={this.state.call.performed}
            name={'performed'}
            type={this.props.type}
            caption={'Проведенная терапия'}
            onChange={this.handleChange}
          />

          <MetaTable
            style={style.data}
            data={this.state.call.therapy}
            name={'therapy'}
            onChange={this.handleChange}
            caption={'Эффект от терапии'}
          />

          {pnd ? null : (
            <Hospitalization
              style={style.data}
              data={this.state.call.hospitalization}
              name={'hospitalization'}
              onChange={this.handleChange}
            />
          )}

          <MetaData
            style={style.data}
            data={this.state.call.recommendations}
            name={'recommendations'}
            type={this.props.type}
            onChange={this.handleChange}
            caption={'Рекомендации'}
          />

          <Directions
            style={style.data}
            id={this.state.call.id}
            data={this.state.call.directions}
            name={'directions'}
            patientId={this.state.call.patientId}
            diagnosisCode={this.state.params.diagnosisCode}
            onChange={this.handleChange}
          />

          <Actives
            style={style.data}
            data={this.state.call.actives}
            name={'actives'}
            onChange={this.handleChange}
          />

          <History
            style={style.data}
            call={this.state.call}
            onChange={this.handleHistory}
            enabled={this.state.tasks.length === 0}
          />
        </div>
      )
    } else {
      content = (
        <div style={style.container}>
          <State call={this.props.call} onClick={this.handleClose} />
          <Persons call={this.props.call} />
          <CallType call={this.props.call} />
          <Address call={this.props.call} />
          <Patient call={this.props.call} />

          <TLoad show={true} icon={'refresh'} inline={true} />
        </div>
      )
    }

    return <div style={style.wrapper}>{content}</div>
  }
}

CallFull.propTypes = {
  call: PropTypes.object.isRequired,
  user: PropTypes.object,
  type: PropTypes.oneOf(['osmp', 'osmpmob', 'pnd', 'pndmob']),
  onClose: PropTypes.func,
  onTools: PropTypes.func,
  showMap: PropTypes.func
}

export default CallFull
