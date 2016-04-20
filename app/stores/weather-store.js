import R from 'ramda';
import Bacon from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from './store-names';
import { createStore } from 'bdux';

const isAction = R.pathEq(
  ['action', 'type']
);

const isCurrent =  isAction(
  ActionTypes.WEATHER_CURRENT
);

const isSetCity =  isAction(
  ActionTypes.WEATHER_CITY
);

const isMetric =  isAction(
  ActionTypes.WEATHER_UNIT_METRIC
);

const isImperial =  isAction(
  ActionTypes.WEATHER_UNIT_IMPERIAL
);

const mergeState = (name, func) => (
  R.converge(R.mergeWith(R.merge), [
    R.identity,
    R.pipe(
      func,
      R.objOf(name),
      R.objOf('state')
    )
  ])
);

const setCurrent = R.when(
  // if setting the current weather.
  isCurrent,
  // merge the weather into state.
  mergeState('current',
    R.path(['action', 'current']))
);

const setCity = R.when(
  // if setting a city name.
  isSetCity,
  // merge the name into state.
  mergeState('city',
    R.path(['action', 'name']))
);

const setUnits = R.cond([
  [isMetric, mergeState('units', 'metric')],
  [isImperial, mergeState('units', 'imperial')],
  [R.T, R.identity]
]);

const getOutputStream = (reducerStream) => (
  reducerStream
    .map(setCurrent)
    .map(setCity)
    .map(setUnits)
    .map(R.prop('state'))
);

export const getReducer = () => {
  let reducerStream = new Bacon.Bus();

  return {
    input: reducerStream,
    output: getOutputStream(reducerStream)
  };
};

export default createStore(
  StoreNames.WEATHER, getReducer
);
