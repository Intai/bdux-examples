import * as R from 'ramda';
import { Bus } from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from './store-names';
import { createStore } from 'bdux';

const isMessage =  R.pathEq(
  ['action', 'type'], ActionTypes.MESSAGE
);

const getMessage = R.ifElse(
  isMessage,
  R.path(['action', 'message']),
  R.prop('state')
);

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(getMessage)
);

export const getReducer = () => {
  let reducerStream = new Bus();

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  };
};

export default createStore(
  StoreNames.MESSAGE, getReducer
);
