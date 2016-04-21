import R from 'ramda';
import Bacon from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from './store-names';
import { createStore } from 'bdux';

const isAction = R.pathEq(
  ['action', 'type']
);

const isFetch =  isAction(
  ActionTypes.WEATHER_FETCH
);

const isFetchEnd =  isAction(
  ActionTypes.WEATHER_CURRENT
);

const isLoading = R.cond([
  [isFetch, R.T],
  [isFetchEnd, R.F],
  [R.T, R.prop('state')]
]);

export const getReducer = () => {
  let reducerStream = new Bacon.Bus();

  return {
    input: reducerStream,
    output: reducerStream
      .map(isLoading)
  };
};

export default createStore(
  StoreNames.LOADING, getReducer
);
