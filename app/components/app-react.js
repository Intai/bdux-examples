import R from 'ramda';
import React from 'react';
import Routes from '../routes';
import { Router, createLocationHistory } from 'bdux-react-router';
import { LocationAction, LocationStore } from 'bdux-react-router';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

const renderRouter = (location) => (
  <Router history={ createLocationHistory(location) }
    routes={ Routes } />
);

const render = R.ifElse(
  R.is(Object),
  renderRouter,
  R.always(<noscript />)
);

export const App = ({ location }) => (
  <div>
    { render(location) }
    <TimeTravel />
  </div>
);

export default createComponent(App, {
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen);
