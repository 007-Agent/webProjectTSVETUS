import React from 'react'

import { TScroll, TPanel, merge } from 'tinput'

import styles from './styles.js'

const Lgota = props => {
  const style = merge(styles, props.style)

  return (
    <div style={style.container}>
      <TPanel>Льготные медикаменты</TPanel>
      <object
        data='http://localhost:8080/pdf/lp2021-10-20-2.pdf'
        style={style.object}
        type='application/pdf'>
        alt : <a href='http://localhost:8080/pdf/lp2021-10-20-2.pdf'>PDF</a>
      </object>
    </div>
  )
}

export default Lgota
