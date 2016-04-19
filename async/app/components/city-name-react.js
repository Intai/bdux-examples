import R from 'ramda';
import React from 'react';
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
  <div>
    <input value={ getCity(weather) }
      className={ cssModule({
        'input': true }) }
      onChange={ onChange } />

    <button>Go</button>
  </div>
);

export default createComponent(CityName, {
  weather: WeatherStore
});
