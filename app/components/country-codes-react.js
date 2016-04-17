import R from 'ramda';
import React from 'react';
import CountryCodesStore from '../stores/country-codes-store';
import CountryCodesAction from '../actions/country-codes-action';
import classNames from 'classnames/bind';
import styles from './country-codes-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const onChange = (event) => {
  CountryCodesAction.select(event.target.value);
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
  <select value={ country.selected }
    onChange={ onChange }
    className={ cssModule({
      'select': true }) }>
    { renderOptions(country.codes) }
  </select>
);

const render = R.ifElse(
  R.is(Object),
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
