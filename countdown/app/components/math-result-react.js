import R from 'ramda';
import React from 'react';
import CountDownStore from '../stores/countdown-store';
import ChallengeStore from '../stores/math-challenge-store';
import classNames from 'classnames/bind';
import styles from './math-result-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const hasChallenge = R.pipe(
  R.nthArg(1),
  R.is(Object)
);

const renderResult = (countdown, challenge) => (
  <span className={ cssModule({
      'count': true }) }>
    { challenge.count } Correct
  </span>
);

const render = R.ifElse(
  // if has timed up.
  R.allPass([R.gte(0), hasChallenge]),
  // render the challenge result.
  renderResult,
  // otherwise, nothing to render.
  R.always(<noscript />)
);

export const MathResult = ({ countdown, challenge }) => (
  render(countdown, challenge)
);

export default createComponent(MathResult, {
  countdown: CountDownStore,
  challenge: ChallengeStore
});
