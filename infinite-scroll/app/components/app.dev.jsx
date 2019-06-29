import React from 'react'
import Theme from './theme'
import Discover from './discover'
import { TimeTravel } from 'bdux-timetravel'
import { ThemeProvider } from 'styled-components'
import { createComponent } from 'bdux'

export const App = () => (
  <ThemeProvider theme={Theme}>
    <React.Fragment>
      <Discover />
      <TimeTravel />
    </React.Fragment>
  </ThemeProvider>
)

export default createComponent(App)