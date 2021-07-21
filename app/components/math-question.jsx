import React from 'react'
import ChallengeStore from '../stores/math-challenge-store'
import { createUseBdux } from 'bdux'

const useBdux = createUseBdux({
  challenge: ChallengeStore,
})

const MathQuestion = (props) => {
  const { state } = useBdux(props)
  const { challenge } = state
  return challenge && `${challenge.question}=`
}

export default React.memo(MathQuestion)
