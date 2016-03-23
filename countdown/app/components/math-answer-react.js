import R from 'ramda';
import React from 'react';
import Actions from '../actions/math-challenge-action';
import ChallengeStore from '../stores/math-challenge-store';
import classNames from 'classnames/bind';
import styles from './math-answer-react.scss';
import { createComponent } from 'bdux';

const cssModule = classNames.bind(styles);

const onChange = (event) => {
  Actions.answer(event.target.value);
};

const confirm = (pass, event) => {
  Actions.confirm();
  return [pass, event];
};

const nextChallenge = ([pass]) => {
  if (pass) {
    Actions.challenge();
  }
};

const preventDefault = ([/*pass*/, event]) => {
  event.preventDefault();
};

const onSubmit = R.curryN(2,
  R.pipe(
    confirm,
    R.tap(nextChallenge),
    preventDefault
  )
);

const renderAnswer = (challenge) => (
  <form onSubmit={ onSubmit(challenge.pass) }
    className={ cssModule({
      'pristine': !challenge.confirm,
      'pass': challenge.confirm && challenge.pass,
      'fail': challenge.confirm && !challenge.pass }) }>

    <input type="text" autoFocus
      value={ challenge.answer }
      onChange={ onChange }
      className={ cssModule({
        'input': true }) } />
  </form>
);

const render = R.ifElse(
  // if it's an object.
  R.is(Object),
  // render the answer field.
  renderAnswer,
  // otherwise, render nothing.
  R.always(<noscript />)
);

export const MathAnswer = ({ challenge }) => (
  render(challenge)
);

export default createComponent(MathAnswer, {
  challenge: ChallengeStore
});
