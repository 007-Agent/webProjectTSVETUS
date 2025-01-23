import React from 'react'
import PropTypes from 'prop-types'

import { merge } from 'tinput'

import styles from './styles'

const Info = props => {
  const info = props.info
  const allergy = info.allergy ? info.allergyTxt : 'отрицает'
  const style = merge(styles, props.style)

  return (
    <div style={style.container}>
      <div style={style.row}>
        <div style={style.ward}>{info.ward}</div>
        <div style={style.type}>{info.hospType}</div>
      </div>
      <div style={style.row}>
        <div style={style.nib}>{info.nib}</div>
        <div style={style.fio}>{info.fio}</div>
      </div>
      <div style={style.age}>
        {info.age} ({info.birthday})
      </div>
      {info.finance ? <div style={style.finance}>{info.finance}</div> : null}
      <div style={style.allergy}>Аллергия: {allergy} </div>
    </div>
  )
}

Info.propTypes = {
  style: PropTypes.object,
  info: PropTypes.object
}

export default Info
