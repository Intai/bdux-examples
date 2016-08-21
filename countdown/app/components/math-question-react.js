import R from 'ramda';
import React from 'react';
import ChallengeStore from '../stores/math-challenge-store';
import { createComponent } from 'bdux'

const renderQuestion = (challenge) => (
  <span>{ challenge.question }=</span>
);

const render = R.ifElse(
  // if it's an object.
  R.is(Object),
  // render the math question.
  renderQuestion,
  // otherwise, render nothing.
  R.always(<noscript />)
);

export const MathQuestion = ({ challenge }) => (
  render(challenge)
);

export default createComponent(MathQuestion, {
  challenge: ChallengeStore
});
