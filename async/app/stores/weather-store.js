import R from 'ramda';
import Bacon from 'baconjs';
import ActionTypes from '../actions/action-types';
import StoreNames from './store-names';
import { createStore } from 'bdux';

const UNKNOWN = {
  current: {
    unknown: true,
    weather: [{
      id: 803
    }],
    main: {
      temp: '?',
      humidity: ''
    },
    clouds: {
      all: ''
    },
    wind: {
      speed: ''
    }
  }
};

const isAction = R.pathEq(
  ['action', 'type']
);

const isCurrent =  isAction(
  ActionTypes.WEATHER_CURRENT
);

const isSetCity =  isAction(
  ActionTypes.WEATHER_CITY
);

const isSetFocus =  isAction(
  ActionTypes.WEATHER_FOCUS
);

const isMetric =  isAction(
  ActionTypes.WEATHER_UNIT_METRIC
);

const isImperial =  isAction(
  ActionTypes.WEATHER_UNIT_IMPERIAL
);

const isClear =  isAction(
  ActionTypes.WEATHER_CLEAR
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

const setFocus = R.when(
  // if setting whether to focus.
  isSetFocus,
  // merge the focus into state.
  mergeState('focus',
    R.path(['action', 'focus']))
);

const defaultFocus = R.when(
  // if focus hasn't been set.
  R.pathEq(['state', 'focus'], undefined),
  // default to true.
  mergeState('focus', R.T)
);

const clearToUnknown = R.when(
  // if clearing the current weather.
  isClear,
  // set it to unknown
  R.set(R.lensProp('state'), UNKNOWN)
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
    .map(setFocus)
    .map(setUnits)
    .map(defaultFocus)
    .map(clearToUnknown)
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
