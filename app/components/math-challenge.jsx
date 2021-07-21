import { mapObjIndexed, T } from 'ramda'
import React from 'react'
import MathAnswer from './math-answer'
import MathQuestion from './math-question'
import * as MathAction from '../actions/math-challenge-action'
import CountDownStore from '../stores/countdown-store'
import ChallengeStore from '../stores/math-challenge-store'
import styles from './math-challenge.scss'
import { createUseBdux } from 'bdux'

const useBdux = createUseBdux({
  countdown: CountDownStore,
  challenge: ChallengeStore,
}, [
  // create the first challenge.
  MathAction.challenge
],
// skipDuplicates.
mapObjIndexed(
  (property, key) => property.skipDuplicates(
    key === 'challenge' ? T : undefined
  )
))

const MathChallenge = (props) => {
  const { state } = useBdux(props)
  const { countdown } = state

  return countdown > 0 && (
    <div className={styles.challenge}>
      <MathQuestion />
      <MathAnswer />
    </div>
  )
}

export default MathChallenge
