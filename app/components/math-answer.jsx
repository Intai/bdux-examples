import React, { useRef, useMemo, useEffect } from 'react'
import * as MathAction from '../actions/math-challenge-action'
import ChallengeStore from '../stores/math-challenge-store'
import classNames from 'classnames/bind'
import styles from './math-answer.scss'
import { createUseBdux } from 'bdux'

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

const useBdux = createUseBdux({
  challenge: ChallengeStore,
})

const MathAnswer = (props) => {
  const { state, dispatch } = useBdux(props)
  const { challenge } = state
  const inputRef = useRef()
  const handleSubmitCb = useMemo(() => handleSubmit(dispatch, challenge.pass), [challenge.pass, dispatch])
  const handleChangeCb = useMemo(() => handleChange(dispatch), [dispatch])

  useEffect(() => {
    const { current: input } = inputRef
    if (input) {
      input.focus()
    }
  }, [])

  return challenge && (
    <form
      className={getFormClass(challenge)}
      onSubmit={handleSubmitCb}
    >
      <input
        className={styles.input}
        ref={inputRef}
        type="text"
        value={challenge.answer}
        onChange={handleChangeCb}
      />
    </form>
  )
}

export default React.memo(MathAnswer)
