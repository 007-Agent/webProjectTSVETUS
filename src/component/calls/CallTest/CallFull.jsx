import React from 'react'
import PropTypes from 'prop-types'

import { TLoad, download, merge, clone, post, compare } from 'tinput'

import Directions from './Directions'

import Saver from '../../Saver'

import styles from './styles.js'

const TIMEOUT = 10 * 1000

class CallFull extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tasks: [],
      changeReasonId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.getCall = this.getCall.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.print = this.print.bind(this)
    this.handleHistory = this.handleHistory.bind(this)
    this.clear = this.clear.bind(this)
    this.connected = this.connected.bind(this)
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
    download('/rest/help/document?id=' + id + '&code=osmp.form.110&format=pdf&name=' + fileName, fileName)
  }

  handleClose() {
    if (this.props.onClose && this.state.tasks.length === 0) {
      this.props.onClose()
    }
  }

  handleChange(task) {
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

  render() {
    let style = merge(styles, this.props.style)
    console.log(
      'CALLFULL ' +
        JSON.stringify(this.props) +
        ' name ' +
        JSON.stringify(this.state) +
        ' changeReasonId ' +
        this.props.changeReasonId
    )
    let content = null

    let pnd = ['pnd', 'pndmob'].indexOf(this.props.type) >= 0

    if (this.state.call) {
      content = (
        <div style={style.container}>
          <Saver tasks={this.state.tasks} call={this.state.call} onClear={this.clear} />

          <Directions
            style={style.data}
            id={this.state.call.id}
            data={this.state.call.directions}
            patientId={this.state.call.patientId}
            name={'directions'}
            onChange={this.handleChange}
          />
        </div>
      )
    } else {
      content = (
        <div style={style.container}>
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
