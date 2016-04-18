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

const getCity = R.path(
  ['city']
);

export const CityName = ({ weather }) => (
  <input value={ getCity(weather) }
    className={ cssModule({
      'input': true }) }
    onChange={ onChange } />
);

export default createComponent(CityName, {
  country: CountryCodesStore,
  weather: WeatherStore
},
// auckland by default.
WeatherAction.init);
