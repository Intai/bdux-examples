import R from 'ramda';
import React from 'react';
import CountryCodesStore from '../stores/country-codes-store';
import WeatherStore from '../stores/weather-store';
import WeatherAction from '../actions/weather-action';
import classNames from 'classnames/bind';
import styles from './weather-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const hasCurrent = R.allPass([
  R.is(Object),
  R.propIs(Object, 'current')
]);

const getCity = R.either(
  R.path(['current', 'name']),
  R.prop('city')
);

const getTitle = R.ifElse(
  R.is(Object),
  getCity,
  R.always('Weather')
);

const renderWeather = (current) => (
  <div>
    <span>{ current.weather[0].description }</span>
    <span>{ current.main.temp }</span>
    <span>{ current.main.humidity }</span>
    <span>{ current.wind.speed }</span>
  </div>
);

const render = R.ifElse(
  hasCurrent,
  R.pipe(R.prop('current'), renderWeather),
  R.always(<noscript />)
);

export const Weather = ({ weather }) => (
  <div>
    <span className={ cssModule({
        'city': true }) }>
      { getTitle(weather) }
    </span>

    { render(weather) }
  </div>
);

export default createComponent(Weather, {
  country: CountryCodesStore,
  weather: WeatherStore
},
// auckland by default.
WeatherAction.init);
