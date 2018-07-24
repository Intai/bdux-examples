import * as R from 'ramda'
import React from 'react'
import MathAnswer from './math-answer'
import MathQuestion from './math-question'
import * as MathAction from '../actions/math-challenge-action'
import CountDownStore from '../stores/countdown-store'
import ChallengeStore from '../stores/math-challenge-store'
import styles from './math-challenge.scss'
import { createComponent } from 'bdux'

const renderChallenge = () => (
  <div className={styles.challenge}>
    <MathQuestion />
    <MathAnswer />
  </div>
)

export const MathChallenge = R.ifElse(
  // if still counting.
  R.propSatisfies(R.lt(0), 'countdown'),
  // render the math challenge.
  renderChallenge,
  // otherwise, render nothing.
  R.F
)

export default createComponent(MathChallenge, {
  countdown: CountDownStore,
  challenge: ChallengeStore
},
// create the first challenge.
MathAction.challenge)
