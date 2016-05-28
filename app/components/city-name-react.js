import R from 'ramda';
import React from 'react';
import CountryCodesStore from '../stores/country-codes-store';
import WeatherStore from '../stores/weather-store';
import WeatherAction from '../actions/weather-action';
import classNames from 'classnames/bind';
import styles from './city-name-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const onChange = (event) => {
  WeatherAction.setCity(event.target.value);
};

const onFocus = () => {
  WeatherAction.setFocus(false);
};

const onBlur = () => {
  WeatherAction.setFocus(true);
};

const hasCountryAndWeather = (country, weather) => (
  country && country.selected &&
  weather && weather.city
);

const searchWeather = R.converge(
  WeatherAction.searchWeather, [
    R.prop('selected'),
    R.pipe(R.nthArg(1), R.prop('city'))
  ]
);

const searchWeatherSafely = R.ifElse(
  hasCountryAndWeather,
  searchWeather,
  R.always()
);

const preventDefault = R.pipe(
  R.nthArg(2),
  R.invoker(0, 'preventDefault')
);

const onSearch = R.curryN(3, R.juxt([
  searchWeatherSafely,
  preventDefault
]));

const getCity = R.path(
  ['city']
);

export const CityName = ({ country, weather }) => (
  <form onSubmit={ onSearch(country, weather) }
    className={ cssModule({
      'wrap': true }) }>

    <label className={ cssModule({
      'label': true }) }>City
    </label>

    <input value={ getCity(weather) }
      onChange={ onChange }
      onFocus={ onFocus }
      onBlur={ onBlur }
      className={ cssModule({
        'input': true }) } />

    <button type="submit"
      className={ cssModule({
        'button': true }) }>Go
    </button>
  </form>
);

export default createComponent(CityName, {
  country: CountryCodesStore,
  weather: WeatherStore
});