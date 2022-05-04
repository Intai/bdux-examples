import './settings'
import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BduxContext, createDispatcher } from 'bdux'
import { hasUniversalStates } from 'bdux-universal/has-universal-states'
import App from './components/app'

const bduxContext = {
  dispatcher: createDispatcher(),
  stores: new WeakMap()
}

const renderApp = () => (
  <BduxContext.Provider value={bduxContext}>
    <App />
  </BduxContext.Provider>
)

const container = document.getElementById('app')
const element = renderApp()

if (hasUniversalStates()) {
  hydrateRoot(container, element)
} else {
  createRoot(container).render(element)
}
