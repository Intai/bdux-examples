import R from 'ramda';
import Bacon from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from '../stores/store-names';
import { createStore } from 'bdux';

const isAction = R.pathEq(
  ['action', 'type']
);

const isMathChallenge = isAction(
  ActionTypes.MATH_CHALLENGE
);

const isMathAnswer = isAction(
  ActionTypes.MATH_ANSWER
);

const isMathConfirm = isAction(
  ActionTypes.MATH_CONFIRM
);

const mergeState = (name, func) => (
  R.converge(R.mergeWith(R.merge), [
    R.identity,
    R.pipe(
      func,
      R.objOf(name),
      R.objOf('state')
    )
  ])
);

const setQuestion = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // merge the question into state.
  mergeState('question',
    // get the math operation.
    R.path(['action', 'operation']))
);

const clearAnswer = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the answer from state.
  mergeState('answer',
    // empty answer.
    R.always(''))
);

const setAnswer = R.when(
  // if answering the current math challenge.
  isMathAnswer,
  // merge the answer into state.
  mergeState('answer',
    // get the answer.
    R.path(['action', 'answer']))
);

const checkMathAnswer = R.converge(
  R.equals, [
    R.pipe(R.path(['action', 'answer']), parseFloat),
    R.pipe(R.path(['state', 'question']), eval)
  ]
);

const clearPass = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the pass from state.
  mergeState('pass',
    // reset to not passing.
    R.always(false))
);

const setPass = R.when(
  // if answering the current math challenge.
  isMathAnswer,
  // merge the pass into state.
  mergeState('pass',
    // whether the answer is correct.
    checkMathAnswer)
);

const clearConfirm = R.when(
  // if creating or answering a math challenge.
  R.anyPass([isMathChallenge, isMathAnswer]),
  // clear the confirm from state.
  mergeState('confirm',
    // hasn't been confirmed
    R.always(false))
);

const setConfirm = R.when(
  // if confirming the current answer.
  isMathConfirm,
  // merge the confirm into state.
  mergeState('confirm',
    // confirmed.
    R.always(true))
);

const isPass = R.pipe(
  R.prop('state'),
  R.propEq('pass', true)
);

const isMathPassConfirm = R.allPass([
  isMathConfirm,
  isPass
]);

const defaultCount = R.pipe(
  R.prop('state'),
  R.defaultTo({}),
  R.prop('count'),
  R.defaultTo(0)
);

const incrementCount = R.pipe(
  R.path(['state', 'count']),
  R.inc
);

const clearCount = R.when(
  // if creating a new math challenge.
  isMathChallenge,
  // clear the count from state.
  mergeState('count',
    // default count to zero.
    defaultCount)
);

const setCount = R.when(
  // if confirming the current correct answer.
  isMathPassConfirm,
  // merge the count into state.
  mergeState('count',
    // increment the number of correct answers.
    incrementCount)
);

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
);

const getReducer = () => {
  let reducerStream = new Bacon.Bus();

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  };
};

export default createStore(
  StoreNames.CHALLENGE, getReducer
);
