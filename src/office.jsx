import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import { styles, templates } from 'styles'
import { check, registerStyles, INITIAL_STATE } from 'tinput'

registerStyles(styles, templates)

import Main from 'online/office/Main'

import {
  reducer,
  scheduleRequest,
  personalRequest,
  departmentsRequest,
  branchesRequest,
  specialitiesRequest
} from 'online/config'

let store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(check())

store.dispatch(scheduleRequest())
store.dispatch(personalRequest())
store.dispatch(departmentsRequest())
store.dispatch(branchesRequest())
store.dispatch(specialitiesRequest())

setInterval(function () {
  store.dispatch(scheduleRequest())
  store.dispatch(personalRequest())
  store.dispatch(departmentsRequest())
  store.dispatch(branchesRequest())
  store.dispatch(specialitiesRequest())
}, 1000 * 60 * 60 * 6)

let device = null
if (!device && window.location.href.indexOf('mobile') >= 0) {
  device = 'mobile'
}

ReactDOM.render(
  <Main store={store} device={device} />,
  document.getElementById('root')
)
