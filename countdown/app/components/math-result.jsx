import * as R from 'ramda'
import React from 'react'
import CountDownStore from '../stores/countdown-store'
import ChallengeStore from '../stores/math-challenge-store'
import styles from './math-result.scss'
import { createComponent } from 'bdux'

const hasCountdown = R.both(
  R.is(Number),
  R.gte(0)
)

const hasChallenge = R.both(
  R.is(Object),
  R.complement(R.isEmpty)
)

const renderResult = (countdown, challenge) => (
  <span className={styles.count}>
    {`${challenge.count} Correct`}
  </span>
)

export const MathResult = ({ countdown, challenge }) => (
  // if has timed up.
  hasCountdown(countdown) && hasChallenge(challenge)
    // render the challenge result.
    && renderResult(countdown, challenge)
)

export default createComponent(MathResult, {
  countdown: CountDownStore,
  challenge: ChallengeStore
})
