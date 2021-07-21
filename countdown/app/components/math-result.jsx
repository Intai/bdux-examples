import { both, complement, gte, is, isEmpty } from 'ramda'
import React from 'react'
import CountDownStore from '../stores/countdown-store'
import ChallengeStore from '../stores/math-challenge-store'
import styles from './math-result.scss'
import { createUseBdux } from 'bdux'

const hasCountdown = both(
  is(Number),
  gte(0)
)

const hasChallenge = both(
  is(Object),
  complement(isEmpty)
)

const useBdux = createUseBdux({
  countdown: CountDownStore,
  challenge: ChallengeStore,
})

const MathResult = (props) => {
  const { state } = useBdux(props)
  const { countdown, challenge } = state

  return hasCountdown(countdown) && hasChallenge(challenge) && (
    <span className={styles.count}>
      {`${challenge.count} Correct`}
    </span>
  )
}

export default MathResult
