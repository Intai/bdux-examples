import React from 'react'
import Loading from './loading'
import Weather from './weather'
import CityName from './city-name'
import CountryCodes from './country-codes'
import { UniversalStates } from 'bdux-universal'
import { TimeTravel } from 'bdux-timetravel'
import { createComponent } from 'bdux'

export const App = () => (
  <React.Fragment>
    <Loading />
    <CountryCodes />
    <CityName />
    <Weather />
    <UniversalStates />
    <TimeTravel />
  </React.Fragment>
)

export default createComponent(App)
