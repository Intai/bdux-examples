import * as R from 'ramda'
import * as Bacon from 'baconjs'
import ActionTypes from '../actions/action-types'
import StoreNames from '../stores/store-names'
import { createStore } from 'bdux'

const isAction = R.pathEq(
  ['action', 'type']
)

const isMathChallenge = isAction(
  ActionTypes.MATH_CHALLENGE
)

const isMathAnswer = isAction(
  ActionTypes.MATH_ANSWER
)

const isMathConfirm = isAction(
  ActionTypes.MATH_CONFIRM
)

const updateState = (name, func) => (
  R.converge(R.assocPath(['state', name]), [
    func,
    R.identity,
  ])
)

const setQuestion = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // merge the question into state.
  updateState('question',
    // get the math operation.
    R.path(['action', 'operation']))
)

const clearAnswer = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the answer from state.
  updateState('answer',
    // empty answer.
    R.always(''))
)

const setAnswer = R.when(
  // if answering the current math challenge.
  isMathAnswer,
  // merge the answer into state.
  updateState('answer',
    // get the answer.
    R.path(['action', 'answer']))
)

const checkMathAnswer = R.converge(
  R.equals, [
    R.pipe(R.path(['action', 'answer']), parseFloat),
    R.pipe(R.path(['state', 'question']), eval)
  ]
)

const clearPass = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the pass from state.
  updateState('pass',
    // reset to not passing.
    R.F)
)

const setPass = R.when(
  // if answering the current math challenge.
  isMathAnswer,
  // merge the pass into state.
  updateState('pass',
    // whether the answer is correct.
    checkMathAnswer)
)

const clearConfirm = R.when(
  // if creating or answering a math challenge.
  R.either(isMathChallenge, isMathAnswer),
  // clear the confirm from state.
  updateState('confirm',
    // hasn't been confirmed
    R.F)
)

const setConfirm = R.when(
  // if confirming the current answer.
  isMathConfirm,
  // merge the confirm into state.
  updateState('confirm',
    // confirmed.
    R.T)
)

const isPass = R.pipe(
  R.prop('state'),
  R.propEq('pass', true)
)

const isMathPassConfirm = R.both(
  isMathConfirm,
  isPass
)

const defaultCount = R.pipe(
  R.path(['state', 'count']),
  R.defaultTo(0)
)

const incrementCount = R.pipe(
  R.path(['state', 'count']),
  R.inc
)

const clearCount = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the count from state.
  updateState('count',
    // default count to zero.
    defaultCount)
)

const setCount = R.when(
  // if confirming the current correct answer.
  isMathPassConfirm,
  // merge the count into state.
  updateState('count',
    // increment the number of correct answers.
    incrementCount)
)

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(setQuestion)
    .map(clearAnswer)
    .map(setAnswer)
    .map(clearPass)
    .map(setPass)
    .map(clearConfirm)
    .map(setConfirm)
    .map(clearCount)
    .map(setCount)
    .map(R.prop('state'))
)

const getReducer = () => {
  const reducerStream = new Bacon.Bus()
  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  }
}

export default createStore(
  StoreNames.CHALLENGE, getReducer
)
