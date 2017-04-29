import React from 'react'
import Theme from './theme'
import Discover from './discover'
import { ThemeProvider } from 'styled-components'
import { createComponent } from 'bdux'

export const App = () => (
  <ThemeProvider theme={Theme}>
    <Discover />
  </ThemeProvider>
)

export default createComponent(App)
