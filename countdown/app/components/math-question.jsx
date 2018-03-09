import * as R from 'ramda'
import ChallengeStore from '../stores/math-challenge-store'
import { createComponent } from 'bdux'

const renderQuestion = ({ challenge }) => (
  `${challenge.question}=`
)

export const MathQuestion = R.ifElse(
  // if it's an object.
  R.propIs(Object, 'challenge'),
  // render the math question.
  renderQuestion,
  // otherwise, render nothing.
  R.F
)

export default createComponent(MathQuestion, {
  challenge: ChallengeStore
})
