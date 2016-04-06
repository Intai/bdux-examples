import React from 'react';
//import Routes from '../routes';
//import { Router, createLocationHistory } from 'bdux-react-router';
import { LocationAction, LocationStore } from 'bdux-react-router';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'
import Page from './page-react';

const renderRouter = (/*location*/) => (
  /*<Router history={ createLocationHistory(location) }
    routes={ Routes } />*/
  <Page params={{ id: '2' }} />
);

export const App = ({ location }) => (
  <div>
    { renderRouter(location) }
    <TimeTravel />
  </div>
);

export default createComponent(App, {
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen);
