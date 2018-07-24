import * as R from 'ramda'
import React from 'react'
import * as MathAction from '../actions/math-challenge-action'
import ChallengeStore from '../stores/math-challenge-store'
import classNames from 'classnames/bind'
import styles from './math-answer.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const handleChange = (dispatch) => (event) => {
  dispatch(MathAction.answer(event.target.value))
}

const handleSubmit = (dispatch, pass) => (event) => {
  dispatch(MathAction.confirm())
  if (pass) {
    dispatch(MathAction.challenge())
  }
  event.preventDefault()
}

const getFormClass = (challenge) => (
  cssModule({
    'pristine': !challenge.confirm,
    'pass': challenge.confirm && challenge.pass,
    'fail': challenge.confirm && !challenge.pass
  })
)

const renderAnswer = ({ challenge, dispatch }) => (
  <form
    className={getFormClass(challenge)}
    onSubmit={handleSubmit(dispatch, challenge.pass)}
  >
    <input
      autoFocus
      className={styles.input}
      onChange={handleChange(dispatch)}
      type="text"
      value={challenge.answer}
    />
  </form>
)

export const MathAnswer = R.ifElse(
  // if it's an object.
  R.propIs(Object, 'challenge'),
  // render the answer field.
  renderAnswer,
  // otherwise, render nothing.
  R.F
)

export default createComponent(MathAnswer, {
  challenge: ChallengeStore
})
