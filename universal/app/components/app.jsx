import React from 'react'
import Page from './page'
import { Router, Route, createLocationHistory } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
import { UniversalStates } from 'bdux-universal'
import { TimeTravel } from 'bdux-timetravel'
import { createUseBdux } from 'bdux'

const renderRouter = (location) => (
  <Router history={createLocationHistory(location)}>
    <Route
      component={Page}
      path="/:id?"
    />
  </Router>
)

const useBdux = createUseBdux({
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen)

export const App = (props) => {
  const { state } = useBdux(props)
  return (
    <>
      {renderRouter(state.location)}
      <UniversalStates />
      <TimeTravel />
    </>
  )
}

export default App
