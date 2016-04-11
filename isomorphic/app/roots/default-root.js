import React from 'react';
import App from '../components/app-react';
import MessageAction from '../actions/message-action';
import MessageStore from '../stores/message-store';
import { resetLocationHistory, LocationStore } from 'bdux-react-router';
import { createRoot } from 'bdux-isomorphic';

export const createElement = (req) => {
  resetLocationHistory(req.path);
  MessageAction.message('Server');
  return (<App />);
};

export default createRoot(
  createElement, {
    location: LocationStore,
    message: MessageStore
  }
);
