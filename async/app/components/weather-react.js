import R from 'ramda';
import React from 'react';
import CountryCodesStore from '../stores/country-codes-store';
import WeatherStore from '../stores/weather-store';
import WeatherAction from '../actions/weather-action';
import classNames from 'classnames/bind';
import styles from './weather-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const switchToMetric = (event) => {
  WeatherAction.switchToMetric();
  event.preventDefault();
};

const switchToImperial = (event) => {
  WeatherAction.switchToImperial();
  event.preventDefault();
};

const hasCurrent = R.allPass([
  R.is(Object),
  R.propIs(Object, 'current')
]);

const shouldFocus = R.allPass([
  R.prop('focus'),
  R.complement(R.path(['current', 'unknown']))
]);

const getCity = R.either(
  R.path(['current', 'name']),
  R.pipe(
    R.prop('city'),
    R.defaultTo('Weather')
  )
);

const getTitle = R.ifElse(
  R.is(Object),
  getCity,
  R.always('Weather')
);

const prependText = R.curry((before, text) => (
  (R.isNil(text))
    ? text
    : (before + text)
));

const appendText = R.curry((after, text) => (
  (R.isNil(text))
    ? text
    : (text + after)
));

const getIcon = R.pipe(
  R.path(['weather', '0', 'id']),
  prependText('owf owf-')
);

const round = (number) => (
  Math.round(number * 100) / 100
);

const convertToKmPerHour = (mps) => (
  (!R.is(Number, mps))
    ? mps
    : round(mps * 3600 / 1000)
);

const renderWeatherDetail = (text) => (
  <span className={ cssModule({
      'detail': true }) }>
    { text }
  </span>
);

const renderWeatherDetailSafely = R.ifElse(
  R.isNil,
  R.always(<noscript />),
  renderWeatherDetail
);

const renderTemperature = R.pipe(
  R.path(['main', 'temp']),
  renderWeatherDetailSafely
);

const renderunits = (current) => (
  <span>
    <a onClick={ switchToMetric }
      className={ cssModule({
        'units': true,
        'selected': true}) }>°C
    </a>

    <span className={ cssModule(
      'separator') }>|
    </span>

    <a onClick={ switchToImperial }
      className={ cssModule({
        'units': true,
        'selected': current.units === 'imperial' }) }>°F
    </a>
  </span>
);

const renderCloudiness = R.pipe(
  R.path(['clouds', 'all']),
  prependText('Cloud: '),
  appendText(' %'),
  renderWeatherDetailSafely
);

const renderHumidity = R.pipe(
  R.path(['main', 'humidity']),
  prependText('Humidity: '),
  appendText(' %'),
  renderWeatherDetailSafely
);

const renderSpeed = R.pipe(
  R.path(['wind', 'speed']),
  convertToKmPerHour,
  prependText('Wind: '),
  appendText(' km/h'),
  renderWeatherDetailSafely
);

const renderWeather = (focus, current) => (
  <div className={ cssModule({
    'weather': true,
    'focus': focus,
    [getIcon(current)]: true }) }>

    <div className={ cssModule({
        'temperature': true }) }>
      { renderTemperature(current) }
      { renderunits(current) }
    </div>

    <div className={ cssModule({
        'details': true }) }>
      { renderCloudiness(current) }
      { renderHumidity(current) }
      { renderSpeed(current) }
    </div>
  </div>
);

const render = R.ifElse(
  hasCurrent,
  R.converge(
    renderWeather, [
      shouldFocus,
      R.prop('current')
    ]
  ),
  R.always(<noscript />)
);

export const Weather = ({ weather }) => (
  <div className={ cssModule({
    'wrap': true }) }>

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
