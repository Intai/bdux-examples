import R from 'ramda';
import React from 'react';
import MathAnswer from './math-answer-react';
import MathQuestion from './math-question-react';
import Actions from '../actions/math-challenge-action';
import CountDownStore from '../stores/countdown-store';
import ChallengeStore from '../stores/math-challenge-store';
import classNames from 'classnames/bind';
import styles from './math-challenge-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const renderChallenge = () => (
  <div className={ cssModule({
      'challenge': true }) }>
    <MathQuestion />
    <MathAnswer />
  </div>
);

const render = R.ifElse(
  // if still counting.
  R.lt(0),
  // render the math challenge.
  renderChallenge,
  // otherwise, render nothing.
  R.always(<noscript />)
);

export const MathChallenge = ({ countdown }) => (
  render(countdown)
);

export default createComponent(MathChallenge, {
  countdown: CountDownStore,
  challenge: ChallengeStore
},
// create the first challenge.
Actions.challenge);
