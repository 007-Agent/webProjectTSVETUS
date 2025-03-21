import React, { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { merge, post, TPanel, TScroll, TRibbon, TPager } from 'tinput'
import Search from '../Search/Search.jsx'
import styles from './styles.js'
import { SearchContext } from '../../../hosp/searchProvider.jsx'
import Ref from 'component/Ref'

import InfoPatient from '../ListPatient/InfoPatient.jsx'

const TIMEOUT = 30 * 1000

const HospList = props => {
  const mounted = useRef(false)
  const timer = useRef(0)
  const userId = props.user && props.user.id ? props.user.id : 0
  const { searchValue } = useContext(SearchContext)
  const [list, setList] = useState([])

  const [index, setIndex] = useState(-1)
  const [type, setType] = useState(1)

  const refresh = useRef()
  refresh.current = event => {
    clearTimeout(timer.current)
    if (index < 0 && event.userId > 0) {
      const query = { type: event.type, family: searchValue }
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
  console.log(list, 'LIST-ID') // показывает спсиок всех пациентов по сан куру

  const onTypeChange = event => {
    if (event.value !== type) setType(event.value)
  }

  const onClick = id => {
    setIndex(id)
    console.log('ID нажатого пациента:', id) // Логируем ID пациента
    if (props.onClick) {
      props.onClick(id)
    }
  }

  // const onClose = () => {
  //   setIndex(-1)
  // }

  // const onTools = tools => {
  //   if (props.onTools) props.onTools(tools)
  // }

  // const onFrame = event => {
  //   // console.log(event, 'ONFRAAAME')
  //   if (index === event.index) {
  //     return (
  //       <HospFull
  //         key={event.item.id}
  //         index={event.index}
  //         info={event.item}
  //         user={props.user}
  //         onClose={onClose}
  //         onTools={onTools}
  //       />
  //     )
  //   } else {
  //     return (
  //       <HospShort
  //         key={event.item.id}
  //         index={event.index}
  //         info={event.item}
  //         onClick={onClick}
  //       />
  //     )
  //   }
  // }

  useEffect(() => {
    refresh.current({ type, userId })
  }, [type, userId, searchValue])

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
          <Search />
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

      {/* <TScroll style={style.scroll}>
        <TRibbon
          style={style.ribbon}
          name={'myRibbon'}
          items={list}
          onFrame={onFrame}
          onClick={onClick}
        />
        
      </TScroll> */}

      <div style={style.mainpatient}>
        {list.map((item, i) => {
          return (
            // <Link
            //   to={`/patient-detail/${item.id}`}
            //   key={item.id}
            //   info={item}
            //   style={{ textDecoration: 'none' }}>
            <InfoPatient
              info={item}
              index={i}
              onClick={() => onClick(item.id)}
              key={item.id}
              user={props.user}
            />
            // </Link>
          )
        })}
      </div>

      {}
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
