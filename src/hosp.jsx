import React  from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SearchProvider } from './hosp/searchProvider'
import { styles, templates } from 'styles'
import { registerStyles, check, INITIAL_STATE, reducer } from 'tinput'

registerStyles(styles, templates)

import Main from 'hosp/Main'
import MedicForms from './component/MedicForms/MedicForms/MedicForms'
import { Provider } from 'react-redux'

let store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(check(store))

ReactDOM.render(
  <SearchProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/hosp.html' element={<Main />} />
          {/* <Route path='patient-detail/:id' element={<MedicForms />} /> */}

          {/* <Route path='/hosp.html' element={<Main />} />
        <Route path='patient-detail/:id' element={<MedicForms />} /> */}
        </Routes>
      </Router>
    </Provider>
  </SearchProvider>,
  document.getElementById('root')
)
