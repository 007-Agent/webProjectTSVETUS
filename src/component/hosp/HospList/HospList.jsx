import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { merge, post, TPanel, TScroll, TRibbon, TPager } from 'tinput'

import styles from './styles.js'

import Ref from 'component/Ref'

import HospShort from './HospShort'
import HospFull from './HospFull'

const TIMEOUT = 30 * 1000

const HospList = props => {
  const mounted = useRef(false)
  const timer = useRef(0)
  const userId = props.user && props.user.id ? props.user.id : 0

  const [list, setList] = useState([])
  const [index, setIndex] = useState(-1)
  const [type, setType] = useState(1)

  const refresh = useRef()
  refresh.current = event => {
    clearTimeout(timer.current)
    if (index < 0 && event.userId > 0) {
      const query = { type: event.type }
      console.log(query)
      // const query = {type}
      post({
        url: '/rest/hosp/list',
        data: query,
        success: response => {
          setList(response)
        },
        default: () => {
          timer.current = setTimeout(() => {
            refresh.current(event)
          }, TIMEOUT)
        }
      })
    } else {
      timer.current = setTimeout(() => {
        refresh.current(event)
      }, TIMEOUT)
    }
  }
  console.log(list)

  const onTypeChange = event => {
    if (event.value !== type) setType(event.value)
  }

  const onClick = event => {
    setIndex(event.index)
  }

  const onClose = () => {
    setIndex(-1)
  }

  const onTools = tools => {
    if (props.onTools) props.onTools(tools)
  }

  const onFrame = event => {
    if (index === event.index) {
      return (
        <HospFull
          key={event.item.id}
          index={event.index}
          info={event.item}
          user={props.user}
          onClose={onClose}
          onTools={onTools}
        />
      )
    } else {
      return (
        <HospShort
          key={event.item.id}
          index={event.index}
          info={event.item}
          onClick={onClick}
        />
      )
    }
  }

  useEffect(() => {
    refresh.current({ type, userId })
  }, [type, userId])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(timer.current)
    }
  }, [])

  const style = merge(styles, props.style)

  // useEffect(() => {
  //   if (list && list.length) setIndex(0)
  // }, [list])

  return (
    <div style={style.container}>
      <TPanel style={style.panel}>
        <div style={style.params.container}>
          <Ref
            style={style.params.type}
            name={'type'}
            label={'Тип:'}
            value={type}
            table={'ref_hosp_type'}
            onChange={onTypeChange}
          />
        </div>
        <TPager
          style={style.pager}
          size={50}
          items={list}
          name={'pgGrid'}
          hide={true}
          // onChange={this.onPage}
        />
      </TPanel>

      <TScroll style={style.scroll}>
        <TRibbon
          style={style.ribbon}
          name={'myRibbon'}
          items={list}
          onFrame={onFrame}
          onClick={onClick}
        />
      </TScroll>
    </div>
  )
}

HospList.propTypes = {
  style: PropTypes.object,
  type: PropTypes.number,
  user: PropTypes.object,
  onTools: PropTypes.func,
  onCaption: PropTypes.func
}

export default HospList
