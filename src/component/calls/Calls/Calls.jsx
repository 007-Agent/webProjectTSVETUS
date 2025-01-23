import React from 'react'
import PropTypes from 'prop-types'

import {
  TPanel,
  TRibbon,
  TPager,
  TScroll,
  TCheck,
  TItemGroup,
  TDate,
  merge,
  clone,
  post,
  compare,
  getCookie,
  setCookie,
  isoDate
} from 'tinput'

import CallShort from 'component/calls/CallShort'
import CallFull from 'component/calls/CallFull'

import styles from './styles.js'

const TIMEOUT = 30 * 1000

const COOKIE = 'QUERY_'

function getQuery(props) {
  let today = new Date()
  let to = isoDate(today)
  let from = isoDate(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
  )
  return {
    from: props.type === 'osmp' ? null : from,
    to: props.type === 'osmp' ? null : to,
    cancelled: getCookie(COOKIE + 'cancelled', 0),
    completed: getCookie(COOKIE + 'completed', 1),
    allCrew: getCookie(COOKIE + 'allCrew', 0),
    calc: 0,
    ychGroup: props.type === 'osmp' || props.type === 'pndmob' ? null : 1,
    execId: props.type === 'osmp' ? 1 : 2
  }
}

class Calls extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: [],
      index: -1,
      query: getQuery(props),
      items: [],
      toolsSelf: [],
      toolsFull: [],
      ychGroups: []
    }
    this.getCalls = this.getCalls.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onFrame = this.onFrame.bind(this)
    this.onPage = this.onPage.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.getStyle = this.getStyle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.connected = this.connected.bind(this)
    this.handleTools = this.handleTools.bind(this)
    this.getYchGroups = this.getYchGroups.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.update()
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout(this.timer)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!compare(prevProps.user, this.props.user)) {
      this.getCalls()
    }
    if (prevState.wait !== this.state.wait) {
      let is = this.state.wait ? styles.icon.wait : styles.icon.common
      if (this.state.failed) {
        is = styles.fail
      }
      let rt = this.state.wait ? 700 : null
      this.setState({
        toolsSelf: [
          { icon: 'refresh', onClick: this.getCalls, style: is, rotateTime: rt }
        ]
      })
    }
    if (
      prevState.toolsSelf !== this.state.toolsSelf ||
      prevState.toolsFull !== this.state.toolsFull
    ) {
      if (this.state.index < 0) {
        this.props.onTools(this.state.toolsSelf)
      } else {
        this.props.onTools(this.state.toolsFull)
      }
    }
    if (prevProps.type !== this.props.type) {
      this.setState({ query: getQuery(this.props) }, () => {
        this.update()
      })
    }
  }

  update() {
    if (this.props.type === 'osmp') {
      this.props.onCaption('Вызовы ОСМП')
    } else {
      this.props.onCaption('Вызовы ПНД')
      this.getYchGroups()
    }
    this.props.onTools([])
    this.getCalls()
  }

  connected() {
    return this.props.user && this.props.user.id > 0
  }

  getCalls() {
    clearTimeout(this.timer)

    if (this.connected() && this.state.index < 0) {
      post({
        url: '/rest/help/short/calls',
        data: { query: this.state.query },
        sender: this,
        success: response => {
          this.setState({ list: response })
        },
        default: () => {
          this.timer = setTimeout(() => {
            this.getCalls()
          }, TIMEOUT)
        }
      })
    } else {
      this.timer = setTimeout(() => {
        this.getCalls()
      }, TIMEOUT)
    }
  }

  getYchGroups() {
    post({
      url: '/rest/help/ych/groups',
      data: null,
      success: response => {
        let ychGroups = response.map(v => {
          return {
            key: v.group,
            value: v.ychList,
            group: 0
          }
        })
        this.setState({ ychGroups: ychGroups })
      }
    })
  }

  getStyle(item, style) {
    let name = 'cancelled'
    switch (item.stateId) {
      case 1:
        name = 'received'
        break
      case 2:
      case 7:
        name = 'driving'
        break
      case 3:
        name = 'arrived'
        break
      case 4:
        name = 'completed'
        break
      case 5:
        name = 'returned'
        break
    }
    let fs = {
      ...styles[name],
      borderStyle: item.urgent > 0 ? 'solid' : 'dashed'
    }
    return merge(style, { frame: fs })
  }

  handleClick(index) {
    if (this.state.index < 0) {
      this.setState({ index: index })
    }
  }

  handleClose() {
    this.setState({ index: -1 })
  }

  handleChange(event) {
    let name = event.name
    let query = {
      ...clone(this.state.query),
      [name]: event.value
    }
    this.setState({ query: query }, () => {
      this.getCalls()
    })
    setCookie(COOKIE + name, event.value)
  }

  handleTools(tools) {
    this.setState({ toolsFull: tools })
  }

  onPage(event) {
    this.setState({ items: event.items })
  }

  onFrame(event) {
    let style = this.getStyle(event.item, event.style)
    if (this.state.index === event.index) {
      return (
        <CallFull
          key={event.item.id}
          call={event.item}
          user={this.props.user}
          type={this.props.type}
          onClose={this.handleClose}
          onTools={this.handleTools}
        />
      )
    } else {
      return (
        <CallShort
          key={event.item.id}
          index={event.index}
          call={event.item}
          style={style}
          onClick={this.handleClick}
        />
      )
    }
  }

  render() {
    let style = merge(styles, this.props.style)

    let ychGroups = null
    let from = null
    let to = null
    if (this.props.type !== 'osmp' && this.props.type !== 'pndmob') {
      ychGroups = (
        <TItemGroup
          name={'ychGroup'}
          style={style.ychGroups}
          grouped={true}
          items={this.state.ychGroups}
          value={this.state.query.ychGroup}
          onChange={this.handleChange}
        />
      )
      from = (
        <TDate
          style={style.params.date}
          name={'from'}
          value={this.state.query.from}
          label={'C:'}
          calendar={true}
          start={1}
          navigators={'month'}
          onChange={this.handleChange}
        />
      )
      to = (
        <TDate
          style={style.params.date}
          name={'to'}
          value={this.state.query.to}
          label={'По:'}
          calendar={true}
          start={1}
          navigators={'month'}
          onChange={this.handleChange}
        />
      )
    }

    return (
      <div style={style.container}>
        <TPanel style={style.panel} minimize={this.state.index >= 0}>
          <div style={style.params.container}>
            {from}

            {to}

            <TCheck
              style={style.params.check}
              name={'cancelled'}
              label={'Отмененные:'}
              value={this.state.query.cancelled}
              checked={1}
              unchecked={0}
              onChange={this.handleChange}
            />

            <TCheck
              style={style.params.check}
              name={'completed'}
              label={'Завершенные:'}
              value={this.state.query.completed}
              checked={1}
              unchecked={0}
              onChange={this.handleChange}
            />
          </div>

          {ychGroups}

          <TPager
            style={style.pager}
            size={50}
            items={this.state.list}
            name={'pgGrid'}
            hide={true}
            onChange={this.onPage}
          />
        </TPanel>

        <TScroll style={style.scroll}>
          <TRibbon
            style={style.ribbon}
            name={'myRibbon'}
            items={this.state.items}
            onFrame={this.onFrame}
            onClick={this.handleClick}
          />
        </TScroll>
      </div>
    )
  }
}

Calls.propTypes = {
  user: PropTypes.object,
  type: PropTypes.oneOf(['osmp', 'osmpmob', 'pnd', 'pndmob']),
  onTools: PropTypes.func,
  onCaption: PropTypes.func
}

export default Calls
