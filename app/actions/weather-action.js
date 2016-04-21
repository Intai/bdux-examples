import R from 'ramda';
import Bacon from 'baconjs';
import fetch from 'isomorphic-fetch';
import uriTemplates from 'uri-templates';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const DEFAULT_CITY = 'Auckland';
const APPID = '7cbd36bfb4764f5613cf8b8e68bf1665';
const URI_WEATHER = uriTemplates('http://api.openweathermap.org/data/2.5/weather{?q,units,appid}');

const unitsProp = (() => {
  let current = 'metric';
  return (next) => (
    (next)
      ? (current = next)
      : current
  );
})();

const countryCodeProp = (() => {
  let current = '';
  return (next) => (
    (next)
      ? (current = next)
      : current
  );
})();

const cityNameProp = (() => {
  let current = '';
  return (next) => (
    (next)
      ? (current = next)
      : current
  );
})();

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
);

const setCountryAndCity = (countryCode = '', cityName = '') => ({
  countryCode: countryCodeProp(countryCode),
  cityName: cityNameProp(cityName)
});

const createWeatherStream = ({ countryCode, cityName }) => (
  Bacon.fromPromise(
    fetch(URI_WEATHER.fill({
      q: `${cityName},${countryCode || ''}`,
      units: unitsProp(),
      appid: APPID
    }), {
      method: 'GET',
      timeout: 5000
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always({}))
);

const createWeather = (current) => ({
  type: ActionTypes.WEATHER_CURRENT,
  current: current
});

const createMetric = () => ({
  type: ActionTypes.WEATHER_UNIT_METRIC
});

const createImperial = () => ({
  type: ActionTypes.WEATHER_UNIT_IMPERIAL
});

export const searchWeather = R.pipe(
  setCountryAndCity,
  createWeatherStream,
  R.invoker(1, 'map')(createWeather)
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
