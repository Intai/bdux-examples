import React from 'react';
import CountDown from './countdown-react';
import MathChallenge from './math-challenge-react';
import MathResult from './math-result-react';
import { TimeTravel } from 'bdux-timetravel';
import { createComponent } from 'bdux'

export const App = () => (
  <div>
    <CountDown />
    <MathChallenge />
    <MathResult />
    <TimeTravel />
  </div>
);

export default createComponent(App);
