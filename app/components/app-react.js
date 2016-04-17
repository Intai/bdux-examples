import React from 'react';
import CountryCodes from './country-codes-react';
import { UniversalStates } from 'bdux-universal';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

export const App = () => (
  <div>
    <CountryCodes />
    <UniversalStates />
    <TimeTravel />
  </div>
);

export default createComponent(App);
