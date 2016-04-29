import R from 'ramda';
import Bacon from 'baconjs';
import fetch from 'isomorphic-fetch';
import uriTemplates from 'uri-templates';
import Common from '../utils/common-util';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const DEFAULT_CITY = 'Auckland';
const APPID = '7cbd36bfb4764f5613cf8b8e68bf1665';
const URI_WEATHER = uriTemplates('http://api.openweathermap.org/data/2.5/weather{?q,units,appid}');

const unitsProp = Common.createProp('metric');
const countryCodeProp = Common.createProp('');
const cityNameProp = Common.createProp(DEFAULT_CITY);

const setCountryAndCity = (countryCode = undefined, cityName = undefined) => ({
  countryCode: countryCodeProp(countryCode),
  cityName: cityNameProp(cityName)
});

const createFetchStream = ({ countryCode, cityName }) => (
  Bacon.once({
    type: ActionTypes.WEATHER_FETCH,
    countryCode: countryCode,
    cityName: cityName
  })
);

const createWeather = R.curry((params, current) => ({
  type: ActionTypes.WEATHER_CURRENT,
  params: params,
  current: current
}));

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
);

const createWeatherStream = ({ countryCode, cityName }) => {
  let params = {
    q: `${cityName},${countryCode || ''}`,
    units: unitsProp(),
    appid: APPID
  };

  return Bacon.fromPromise(
    fetch(URI_WEATHER.fill(params), {
      method: 'GET',
      timeout: 5000
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always({}))
  .map(createWeather(params));
};

const createFetchWeatherStream = R.converge(
  Bacon.mergeAll, [
    createFetchStream,
    createWeatherStream
  ]
);

const createMetric = () => ({
  type: ActionTypes.WEATHER_UNIT_METRIC
});

const createImperial = () => ({
  type: ActionTypes.WEATHER_UNIT_IMPERIAL
});

export const searchWeather = R.pipe(
  setCountryAndCity,
  createFetchWeatherStream
);

export const setCity = (name) => ({
  type: ActionTypes.WEATHER_CITY,
  name: name
});

export const setFocus = (focus) => ({
  type: ActionTypes.WEATHER_FOCUS,
  focus: focus
});

export const clear = () => ({
  type: ActionTypes.WEATHER_CLEAR
});

export const switchToMetric = R.pipe(
  R.partial(unitsProp, ['metric']),
  createMetric
);

export const switchToImperial = R.pipe(
  R.partial(unitsProp, ['imperial']),
  createImperial
);

const shouldInit = R.pipe(
  R.path(['weather', 'current']),
  R.anyPass([R.isNil, R.isEmpty])
);

const setDefaultCity = R.partial(
  setCity, [DEFAULT_CITY]
);

const createInitStream = ({ country }) => (
  Bacon.mergeAll(
    // enter auckland by default.
    Bacon.once(setDefaultCity()),
    // fetch the current weather from internet.
    searchWeather(country && country.selected, DEFAULT_CITY)
  )
);

export const init = R.ifElse(
  shouldInit,
  createInitStream,
  setDefaultCity
);

export default bindToDispatch({
  init,
  setCity,
  setFocus,
  searchWeather,
  switchToMetric,
  switchToImperial,
  clear
});
