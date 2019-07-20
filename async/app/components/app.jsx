import React from 'react'
import Loading from './loading'
import Weather from './weather'
import CityName from './city-name'
import CountryCodes from './country-codes'
import { UniversalStates } from 'bdux-universal'
import { TimeTravel } from 'bdux-timetravel'
import { useBdux } from 'bdux'

export const App = (props) => {
  useBdux(props)
  return (
    <>
      <Loading />
      <CountryCodes />
      <CityName />
      <Weather />
      <UniversalStates />
      <TimeTravel />
    </>
  )
}

export default App
