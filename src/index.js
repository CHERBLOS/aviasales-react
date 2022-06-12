import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { getTicketsToDispatch } from './functions'
import App from './components/app'
import { addTickets, setLoader } from './store/uiReducer/actions'

getTicketsToDispatch(store, addTickets, setLoader)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
