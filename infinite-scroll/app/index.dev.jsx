import './settings'
import React from 'react'
import ReactDOM from 'react-dom'
import { BduxContext, createDispatcher } from 'bdux'
import App from './components/app.dev'

const bduxContext = {
  dispatcher: createDispatcher(),
  stores: new WeakMap()
}

const renderApp = () => (
  <BduxContext.Provider value={bduxContext}>
    <App />
  </BduxContext.Provider>
)

ReactDOM.render(
  renderApp(),
  document.getElementById('app')
)
