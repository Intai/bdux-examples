import R from 'ramda';
import React from 'react';
import CountDownAction from '../actions/countdown-action';
import CountDownStore from '../stores/countdown-store';
import classNames from 'classnames/bind';
import styles from './countdown-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const twoDigits = (number) => (
  // add a leading zero.
  ('0' + number).slice(-2)
);

const format = (seconds) => (
  // format to mm:ss.
  twoDigits(Math.floor(seconds / 60)) + ':'
    + twoDigits(seconds % 60)
);

const renderCountDown = (countdown) => (
  <span className={ cssModule({
      'time': true }) }>
    { format(countdown) }
  </span>
);

const render = R.ifElse(
  // if it's a number.
  R.is(Number),
  // render the countdown.
  renderCountDown,
  // otherwise, render nothing.
  R.always(<noscript />)
);

export const CountDown = ({ countdown }) => (
  render(countdown)
);

export default createComponent(CountDown, {
  countdown: CountDownStore
},
// start counting down.
CountDownAction.countdown);
