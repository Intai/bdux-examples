import R from 'ramda';

const mapToKeyValue = (obj, key) => {
  obj[key] = key;
  return obj
};

const mapToKeys = R.reduce(
  mapToKeyValue, {}
);

export default mapToKeys([
  'COUNTDOWN_START',
  'COUNTDOWN_TICK',
  'COUNTDOWN_STOP',
  'MATH_CHALLENGE',
  'MATH_ANSWER',
  'MATH_CONFIRM'
]);
