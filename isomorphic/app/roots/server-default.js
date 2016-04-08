import React from 'react';
import App from '../components/app-react.js';
import { resetLocationHistory} from 'bdux-react-router';

export const createDefaultApp = (req) => {
  resetLocationHistory(req.path);
  return (<App />);
};