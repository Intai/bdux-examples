import R from 'ramda';
import React from 'react';
import Bacon from 'baconjs';
import App from '../components/app-react';
import WeatherAction from '../actions/weather-action';
import WeatherStore from '../stores/weather-store';
import CountryCodesAction from '../actions/country-codes-action';
import CountryCodesStore from '../stores/country-codes-store';
import { createRoot } from 'bdux-universal';

export const createElement = () => (
  Bacon.when([
    // fetch country codes from internet.
    CountryCodesAction.load(),
    // fetch the current weather for Auckland.
    WeatherAction.searchWeather('NZ', 'Auckland')
  ],
  // create application.
  R.always(<App />))
);

export default createRoot(
  createElement, {
    countryCodes: CountryCodesStore,
    weather: WeatherStore
  }
);
