import React from 'react'
import Page from './page'
import { Router, Route, createLocationHistory } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
import { UniversalStates } from 'bdux-universal'
import { TimeTravel } from 'bdux-timetravel'
import { createComponent } from 'bdux'

const renderRouter = (location) => (
  !!location && (
    <Router history={createLocationHistory(location)}>
      <Route
        component={Page}
        path="/:id?"
      />
    </Router>
   )
)

export const App = ({ location }) => (
  <div>
    {renderRouter(location)}
    <UniversalStates />
    <TimeTravel />
  </div>
)

export default createComponent(App, {
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen)
