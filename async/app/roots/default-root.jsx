import * as R from 'ramda'
import React from 'react'
import Bacon from 'baconjs'
import App from '../components/app'
import * as WeatherAction from '../actions/weather-action'
import WeatherStore from '../stores/weather-store'
import * as CountryCodesAction from '../actions/country-codes-action'
import CountryCodesStore from '../stores/country-codes-store'
import { createAsyncRoot } from 'bdux-universal'

export const createAsyncActions = () => (
  Bacon.when([
    // fetch country codes from internet.
    CountryCodesAction.load(),
    // select New Zealand.
    Bacon.once(CountryCodesAction.select('NZ')),
    // set Auckland as the target.
    Bacon.once(WeatherAction.setCity('Auckland')),
    // fetch the current weather for Auckland.
    WeatherAction.searchWeather('NZ', 'Auckland').last()
  ],
  // get arguments as an array.
  R.unapply(R.identity))
)

export const createElement = () => (
  <App />
)

export default createAsyncRoot(
  createAsyncActions,
  createElement, {
    country: CountryCodesStore,
    weather: WeatherStore
  }
)
