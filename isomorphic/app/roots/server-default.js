import React from 'react';
import App from '../components/app-react.js';
import { createLocationHistory} from 'bdux-react-router';

export const createDefaultApp = (req) => {
  createLocationHistory(req.path);
  return (<App />);
};