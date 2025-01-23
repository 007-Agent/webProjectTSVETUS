import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import {styles, templates} from 'styles';
import {registerStyles, check, INITIAL_STATE, reducer} from "tinput";

registerStyles(styles, templates);

import Main from 'osmp/Main';

let store = createStore(reducer, INITIAL_STATE, applyMiddleware(thunkMiddleware));

store.dispatch(check(store));

ReactDOM.render(
    <Main store={store} />,
    document.getElementById('root')
);
