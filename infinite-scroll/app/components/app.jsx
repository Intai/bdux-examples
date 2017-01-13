import React from 'react'
import { TimeTravel } from 'bdux-timetravel'
import { createComponent } from 'bdux'

export const App = () => (
  <div>
    <TimeTravel />
  </div>
)

export default createComponent(App)
