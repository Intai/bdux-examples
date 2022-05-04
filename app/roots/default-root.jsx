import React from 'react'
import App from '../components/app'
import * as MessageAction from '../actions/message-action'
import MessageStore from '../stores/message-store'
import { resetLocationHistory, LocationAction, LocationStore } from 'bdux-react-router'
import { createRoot } from 'bdux-universal'

export const renderElement = ({ dispatch }, req) => {
  dispatch(LocationAction.listen())
  resetLocationHistory(req.path)
  dispatch(MessageAction.message('Message from Server'))
  return <App />
}

export default createRoot(
  renderElement, {
    location: LocationStore,
    message: MessageStore
  }
)
