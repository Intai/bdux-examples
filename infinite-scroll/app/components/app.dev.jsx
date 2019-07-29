import React from 'react'
import Theme from './theme'
import Discover from './discover'
import { TimeTravel } from 'bdux-timetravel'
import { ThemeProvider } from 'styled-components'
import { useBdux } from 'bdux'

export const App = (props) => {
  useBdux(props)
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Discover />
        <TimeTravel />
      </>
    </ThemeProvider>
  )
}

export default App
