import R from 'ramda';
import Bacon from 'baconjs';
import fetch from 'isomorphic-fetch';
import uriTemplates from 'uri-templates';
import Common from '../utils/common-util';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const DEFAULT_COUNTRY = 'NZ';
const DEFAULT_CITY = 'Auckland';
const APPID = '7cbd36bfb4764f5613cf8b8e68bf1665';
const URI_WEATHER = uriTemplates('http://api.openweathermap.org/data/2.5/weather{?q,units,appid}');

const countryCodeProp = Common.createProp(DEFAULT_COUNTRY);
const cityNameProp = Common.createProp(DEFAULT_CITY);
const unitsProp = Common.createProp('metric');

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

export const createWeatherQuery = (countryCode, cityName) => (
  `${cityName},${countryCode || ''}`
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
    q: createWeatherQuery(countryCode, cityName),
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

const isDefaultCountry = R.pipe(
  R.path(['country', 'selected']),
  R.equals(DEFAULT_COUNTRY)
);

const isDefaultCity = R.pipe(
  R.path(['weather', 'city']),
  R.equals(DEFAULT_CITY)
);

const hasCurrent = R.pipe(
  R.path(['weather', 'current']),
  R.complement(R.anyPass([
    R.isNil,
    R.isEmpty,
    R.prop('unknown')
  ]))
);

const shouldInit = R.complement(R.allPass([
  isDefaultCountry,
  isDefaultCity,
  hasCurrent
]));

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
