import R from 'ramda';
import React from 'react';
import CountryCodesStore from '../stores/country-codes-store';
import CountryCodesAction from '../actions/country-codes-action';
import WeatherAction from '../actions/weather-action';
import classNames from 'classnames/bind';
import styles from './country-codes-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const isNotEmpty = R.allPass([
  R.is(Object),
  R.pipe(
    R.prop('codes'),
    R.anyPass([R.isNil, R.isEmpty]),
    R.not
  )
]);

const onChange = (event) => {
  CountryCodesAction.select(event.target.value);
  WeatherAction.clear();
};

const renderOption = (code) => (
  <option key={ code.Code }
    value={ code.Code }>
    { code.Name }
  </option>
);

const renderOptions = (codes) => (
  R.map(renderOption, codes || [])
);

const renderCountryCodes = (country) => (
  <div className={ cssModule({
    'wrap': true }) }>

    <label className={ cssModule({
      'label': true }) }>Country
    </label>

    <select value={ country.selected }
      onChange={ onChange }
      className={ cssModule({
        'select': true }) }>
      { renderOptions(country.codes) }
    </select>
  </div>
);

const render = R.ifElse(
  isNotEmpty,
  renderCountryCodes,
  R.always(<noscript />)
);

export const CountryCodes = ({ country }) => (
  render(country)
);

export default createComponent(CountryCodes, {
  country: CountryCodesStore
},
// initialise country codes,
// select new zealand by default.
CountryCodesAction.init);
