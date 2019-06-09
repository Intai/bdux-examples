import React from 'react'
import { Router, Route, createLocationHistory } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
import { TimeTravel } from 'bdux-timetravel'
import { createUseBdux } from 'bdux'
import Page from './page'

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

const useBdux = createUseBdux({
  location: LocationStore
},
// start listening to browser history.
LocationAction.listen)

const App = (props) => {
  const { state } = useBdux(props)
  return (
    <>
      {renderRouter(state.location)}
      <TimeTravel />
    </>
  )
}

export default App
