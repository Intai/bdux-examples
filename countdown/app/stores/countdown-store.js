import R from 'ramda';
import Bacon from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from '../stores/store-names';
import { createStore } from 'bdux';

const isAction = R.pathEq(
  ['action', 'type']
);

const mergeState = (func) => (
  R.converge(R.merge, [
    R.identity,
    R.pipe(
      func,
      R.objOf('state')
    )
  ])
);

const calcCountDownFromTick = ({ action }) => (
  Math.max(
    // remaining seconds.
    Math.ceil((action.to - action.current) / 1000),
    // can not be negative.
    0
  )
);

const whenStartTick = R.when(
  R.anyPass([
    // if either starting to countdown or already ticking.
    isAction(ActionTypes.COUNTDOWN_START),
    isAction(ActionTypes.COUNTDOWN_TICK)
  ]),
  // calculate the countdown in seconds.
  mergeState(calcCountDownFromTick)
);

const whenStop = R.when(
  // if stopping the countdown.
  isAction(ActionTypes.COUNTDOWN_STOP),
  // zero at the end of countdown.
  mergeState(R.always(0))
);

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(whenStartTick)
    .map(whenStop)
    .map(R.prop('state'))
);

export const getReducer = () => {
  let reducerStream = new Bacon.Bus();

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  };
};

export default createStore(
  StoreNames.COUNTDOWN, getReducer
);
