import React from 'react'
import App from '../components/app'
import { resetLocationHistory, LocationStore } from 'bdux-react-router'
import { createRoot } from 'bdux-universal'

export const createElement = (_, req) => {
  resetLocationHistory(req.path)
  return <App />
}

export default createRoot(
  createElement, {
    location: LocationStore
  }
)
