import React from 'react'
import Loading from './loading'
import Weather from './weather'
import CityName from './city-name'
import CountryCodes from './country-codes'
import { UniversalStates } from 'bdux-universal/states'
import { TimeTravel } from 'bdux-timetravel'

export const App = () => (
  <>
    <Loading />
    <CountryCodes />
    <CityName />
    <Weather />
    <UniversalStates />
    <TimeTravel />
  </>
)

export default App
