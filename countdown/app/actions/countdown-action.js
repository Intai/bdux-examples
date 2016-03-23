import R from 'ramda';
import Bacon from 'baconjs';
import Common from '../utils/common-util';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const TIME_COUNTDOWN = 60000;
const TIME_TICK = 1000;

const createCountdown = () => {
  let now = Common.now();

  return {
    type: ActionTypes.COUNTDOWN_START,
    from: now,
    current: now,
    to: now + TIME_COUNTDOWN
  };
};

const createTick = () => ({
  type: ActionTypes.COUNTDOWN_TICK,
  current: Common.now()
});

const createStop = () => ({
  type: ActionTypes.COUNTDOWN_STOP
});

const createTickForPoll = R.pipe(
  createTick,
  R.constructN(1, Bacon.Next)
);

const isTicking = R.converge(R.lte, [
  R.prop('current'),
  R.prop('to')
]);

const handleTickEnd = function(event) {
  return isTicking(event.value())
    ? this.push(event)
    : this.push(new Bacon.End());
};

const whenOnEnd = (stream) => {
  let isEnd = true;
  let dispose = R.F;

  return () => {
    if (isEnd) {
      dispose();
      isEnd = false;
      dispose = stream.onEnd(() => {
        isEnd = true;
      });

      return stream;
    }
  };
};

export const countdown = whenOnEnd(
  Bacon.mergeAll(
    // start the countdown.
    Bacon.once(createCountdown()),
    // ticking.
    Bacon.fromPoll(TIME_TICK, createTickForPoll)
  )
  .scan({}, R.merge)
  .filter(R.complement(R.isEmpty))
  // determine when to end.
  .withHandler(handleTickEnd)
  // stop the countdown.
  .mapEnd(createStop)
);

export default bindToDispatch({
  countdown
});
