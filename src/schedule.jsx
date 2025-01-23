import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import {styles, templates} from 'styles';
import {registerStyles, INITIAL_STATE} from "tinput";

registerStyles(styles, templates);

import Main from 'online/schedule/Main';

import {
    reducer,
    scheduleRequest,
    personalRequest,
    departmentsRequest,
    branchesRequest
} from 'online/config';

let store = createStore(reducer, INITIAL_STATE, applyMiddleware(thunkMiddleware));

store.dispatch(scheduleRequest());
store.dispatch(personalRequest());
store.dispatch(departmentsRequest());
store.dispatch(branchesRequest());

setInterval(function() {
    store.dispatch(scheduleRequest());
    store.dispatch(personalRequest());
    store.dispatch(departmentsRequest());
    store.dispatch(branchesRequest());
}, 1000*60*60*6);

ReactDOM.render(
    <Main store={store} />,
    document.getElementById('root')
);
