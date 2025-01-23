import {
  SCHEDULE_RECEIVE_ACTION,
  PERSONAL_RECEIVE_ACTION,
  DEPARTMENTS_RECEIVE_ACTION,
  BRANCHES_RECEIVE_ACTION,
  SPECIALITIES_RECEIVE_ACTION
} from './actions.js'

import { INITIAL_STATE, reducer as REDUCER } from 'tinput'

INITIAL_STATE.schedule = []
INITIAL_STATE.personal = []
INITIAL_STATE.departments = []
INITIAL_STATE.branches = []
INITIAL_STATE.specialities = []

function scheduleReducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  switch (action.type) {
    case SCHEDULE_RECEIVE_ACTION:
      return action.data
    default:
      return state
  }
}

function personalReducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  switch (action.type) {
    case PERSONAL_RECEIVE_ACTION:
      return action.data
    default:
      return state
  }
}

function departmentsReducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  switch (action.type) {
    case DEPARTMENTS_RECEIVE_ACTION:
      return action.data
    default:
      return state
  }
}

function branchesReducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  switch (action.type) {
    case BRANCHES_RECEIVE_ACTION:
      return action.data
    default:
      return state
  }
}

function specialitiesReducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  switch (action.type) {
    case SPECIALITIES_RECEIVE_ACTION:
      return action.data
    default:
      return state
  }
}

export function reducer(state = null, action = null) {
  if (action === null) {
    return state
  } else {
    let newState = REDUCER(state, action)
    newState.schedule = scheduleReducer(newState.schedule, action)
    newState.personal = personalReducer(newState.personal, action)
    newState.departments = departmentsReducer(newState.departments, action)
    newState.branches = branchesReducer(newState.branches, action)
    newState.specialities = specialitiesReducer(newState.specialities, action)
    return newState
  }
}
