import * as R from 'ramda'
import React from 'react'
import Actions from '../actions/math-challenge-action'
import ChallengeStore from '../stores/math-challenge-store'
import classNames from 'classnames/bind'
import styles from './math-answer.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const onChange = (event) => {
  Actions.answer(event.target.value)
}

const confirm = () => {
  Actions.confirm()
}

const nextChallenge = (pass) => {
  if (pass) {
    Actions.challenge()
  }
}

const onSubmit = (pass) => (event) => {
  confirm()
  nextChallenge(pass)
  event.preventDefault()
}

const getFormClass = (challenge) => (
  cssModule({
    'pristine': !challenge.confirm,
    'pass': challenge.confirm && challenge.pass,
    'fail': challenge.confirm && !challenge.pass
  })
)

const renderAnswer = ({ challenge }) => (
  <form
    className={getFormClass(challenge)}
    onSubmit={onSubmit(challenge.pass)}
  >
    <input
      autoFocus
      className={styles.input}
      onChange={onChange}
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
