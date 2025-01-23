import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'

import styles from './MyFolder/styles.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [
        { id: 1, name: 'Bob Marby' },
        { id: 2, name: 'Mike Holland' }
      ]
    }
  }

  render() {
    const result = this.state.arr.map(item => {
      return (
        <div style={styles.container} key={item.id}>
          <a style={{ innerHeight: 15 }}>{item.name}</a>
        </div>
      )
    })

    return (
      <div>
        <h2>Push it {result}</h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
