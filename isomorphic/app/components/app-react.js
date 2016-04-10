import React from 'react';
import Routes from '../routes';
import { Router, createLocationHistory } from 'bdux-react-router';
import { LocationAction, LocationStore } from 'bdux-react-router';
import { IsomorphicStates } from 'bdux-isomorphic';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

const renderRouter = (location) => (
  <Router history={ createLocationHistory(location) }
    routes={ Routes } />
);

export const App = ({ location }) => (
  <div>
    { renderRouter(location) }
    <IsomorphicStates />
    <TimeTravel />
  </div>
);

export default createComponent(App, {
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen);
