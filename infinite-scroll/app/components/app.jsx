import React from 'react'
import Discover from './discover'
import { TimeTravel } from 'bdux-timetravel'
import { createComponent } from 'bdux'

export const App = () => (
  <div>
    <Discover />
    <TimeTravel />
  </div>
)

export default createComponent(App)
