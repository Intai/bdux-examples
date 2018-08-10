import * as R from 'ramda'
import React from 'react'
import Blog from './blog'
import About from './about'
import * as StartupAction from '../actions/startup-action'
import { pureRender } from './decorators/pure-render'
import { Router, Switch, Route, createLocationHistory } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
import { PouchDBAction, PouchDBAdminConsole } from 'bdux-pouchdb'
import { UniversalStates } from 'bdux-universal'
import { createComponent } from 'bdux'

const renderRouter = (location) => (
  !!location && (
    <Router history={createLocationHistory(location)}>
      <Switch>
        <Route
          component={About}
          path="/about"
        />
        <Route
          component={Blog}
          path="/blog/:year?/:month?/:day?/:slug?"
        />
      </Switch>
    </Router>
   )
)

export const App = ({ location }) => (
  <React.Fragment>
    {renderRouter(location)}
    <PouchDBAdminConsole />
    <UniversalStates />
  </React.Fragment>
)

const decorate = R.pipe(
  pureRender,
  createComponent(
    {
      location: LocationStore
    },
    // start listening to browser history.
    LocationAction.listen,
    // start listening to pouchdb updates for admin.
    PouchDBAction.startAdmin,
    // synchronise states from pouchdb.
    StartupAction.syncPouchDB
  )
)

export default decorate(App)
