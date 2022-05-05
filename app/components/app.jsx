import React from 'react'
import Page from './page'
import { Router, Routes, Route } from 'bdux-react-router'
import { LocationAction, LocationStore, updateRouterLocation } from 'bdux-react-router'
import { UniversalStates } from 'bdux-universal/states'
import { TimeTravel } from 'bdux-timetravel'
import { createUseBdux } from 'bdux'

const renderRouter = (location) => (
  <Router location={updateRouterLocation(location)}>
    <Routes>
      <Route
        element={<Page />}
        path="/:id"
      />
      <Route
        element={<Page />}
        index
      />
    </Routes>
  </Router>
)

const useBdux = createUseBdux({
  location: LocationStore
}, [
  // start listening to browser history.
  LocationAction.listen
])

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
