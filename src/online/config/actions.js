import { request } from 'tinput'

export const SCHEDULE_RECEIVE_ACTION = 'SCHEDULE_RECEIVE_ACTION'
export function scheduleReceive(data) {
  return {
    type: SCHEDULE_RECEIVE_ACTION,
    data: data
  }
}

export function scheduleRequest() {
  let date = new Date()
  return request({
    url: '/api/sched/list',
    data: { date: date },
    success: (dispatch, data) => {
      dispatch(scheduleReceive(data))
    }
  })
}

export const PERSONAL_RECEIVE_ACTION = 'PERSONAL_RECEIVE_ACTION'
export function personalReceive(data) {
  return {
    type: PERSONAL_RECEIVE_ACTION,
    data: data
  }
}

export function personalRequest() {
  return request({
    url: '/api/sched/pers',
    data: {},
    success: (dispatch, data) => {
      dispatch(personalReceive(data))
    }
  })
}

export const DEPARTMENTS_RECEIVE_ACTION = 'DEPARTMENTS_RECEIVE_ACTION'
export function departmentsReceive(data) {
  return {
    type: DEPARTMENTS_RECEIVE_ACTION,
    data: data
  }
}

export function departmentsRequest() {
  return request({
    url: '/api/sched/dep',
    data: {},
    success: (dispatch, data) => {
      dispatch(departmentsReceive(data))
    }
  })
}

export const BRANCHES_RECEIVE_ACTION = 'BRANCHES_RECEIVE_ACTION'
export function branchesReceive(data) {
  return {
    type: BRANCHES_RECEIVE_ACTION,
    data: data
  }
}

export function branchesRequest() {
  return request({
    url: '/api/sched/branch',
    data: {},
    success: (dispatch, data) => {
      dispatch(branchesReceive(data))
    }
  })
}

export const SPECIALITIES_RECEIVE_ACTION = 'SPECIALITIES_RECEIVE_ACTION'
export function specialitiesReceive(data) {
  return {
    type: SPECIALITIES_RECEIVE_ACTION,
    data: data
  }
}

export function specialitiesRequest() {
  return request({
    url: '/api/sched/spec',
    data: {},
    success: (dispatch, data) => {
      dispatch(specialitiesReceive(data))
    }
  })
}
