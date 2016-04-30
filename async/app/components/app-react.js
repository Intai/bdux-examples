import React from 'react';
import Loading from './loading-react';
import Weather from './weather-react';
import CityName from './city-name-react';
import CountryCodes from './country-codes-react';
import { UniversalStates } from 'bdux-universal';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

export const App = () => (
  <div>
    <Loading />
    <CountryCodes />
    <CityName />
    <Weather />
    <UniversalStates />
    <TimeTravel />
  </div>
);

export default createComponent(App);
