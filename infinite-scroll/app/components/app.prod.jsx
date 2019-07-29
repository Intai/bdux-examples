import React from 'react'
import Theme from './theme'
import Discover from './discover'
import { ThemeProvider } from 'styled-components'
import { useBdux } from 'bdux'

export const App = (props) => {
  useBdux(props)
  return (
    <ThemeProvider theme={Theme}>
      <Discover />
    </ThemeProvider>
  )
}

export default App
