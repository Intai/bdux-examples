import './settings'
import React from 'react'
import ReactDOM from 'react-dom'
import { hasUniversalStates } from 'bdux-universal'
import App from './components/app'

const ReactDOMRender = hasUniversalStates()
  ? ReactDOM.hydrate
  : ReactDOM.render

ReactDOMRender(
  <App />,
  document.getElementById('app')
)
