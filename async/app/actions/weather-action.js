import R from 'ramda';
import Bacon from 'baconjs';
import fetch from 'isomorphic-fetch';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const APPID = 'b1b15e88fa797225412429c1c50c122a';
const DEFAULT_CITY = 'Auckland';

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
);

const createWeatherStream = (countryCode, cityName) => (
  Bacon.fromPromise(
    fetch('http://api.openweathermap.org/data/2.5/weather' +
        `?q=${cityName},${countryCode || ''}` +
        `&appid=${APPID}`, {
      method: 'GET',
      mode: 'cors'
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always({}))
);

const createWeather = (current) => ({
  type: ActionTypes.WEATHER_CURRENT,
  current: current
});

export const searchWeather = R.pipe(
  createWeatherStream,
  R.invoker(1, 'map')(createWeather)
);

export const setCity = (name) => ({
  type: ActionTypes.WEATHER_CITY,
  name: name
});

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
  R.complement(R.path(['weather', 'current'])),
  createInitStream,
  setDefaultCity
);

export default bindToDispatch({
  init,
  setCity,
  searchWeather
});
