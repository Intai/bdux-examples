import Common from '../utils/common-util'
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

export const lap = () => ({
  type: ActionTypes.STOPWATCH_LAP
});

export const reset = () => ({
  type: ActionTypes.STOPWATCH_RESET
});

export const start = () => ({
  type: ActionTypes.STOPWATCH_START,
  time: Common.now()
});

export const stop = () => ({
  type: ActionTypes.STOPWATCH_STOP
});

export default bindToDispatch({
  lap,
  reset,
  start,
  stop
});
