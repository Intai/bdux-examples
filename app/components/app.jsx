import React from 'react'
import CountDown from './countdown'
import MathChallenge from './math-challenge'
import MathResult from './math-result'
import { TimeTravel } from 'bdux-timetravel'

export const App = () => (
  <>
    <CountDown />
    <MathChallenge />
    <MathResult />
    <TimeTravel />
  </>
)

export default App
