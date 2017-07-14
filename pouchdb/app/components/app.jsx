import React from 'react'
import Blog from './blog'
import About from './about'
import { Router, Switch, Route, createLocationHistory } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
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
          path="/:year?/:month?/:day?/:slug?"
        />
      </Switch>
    </Router>
   )
)

export const App = ({ location }) => (
  <div>
    {renderRouter(location)}
    <UniversalStates />
  </div>
)

export default createComponent(App, {
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen)
