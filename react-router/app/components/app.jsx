import React from 'react'
import { Router, Routes, Route } from 'bdux-react-router'
import { LocationAction, LocationStore } from 'bdux-react-router'
import { TimeTravel } from 'bdux-timetravel'
import { createUseBdux } from 'bdux'
import Page from './page'

const renderRouter = (location) => !!location && (
  <Router location={location}>
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
