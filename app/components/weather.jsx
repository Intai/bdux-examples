import * as R from 'ramda'
import React from 'react'
import CountryCodesStore from '../stores/country-codes-store'
import WeatherStore from '../stores/weather-store'
import WeatherAction from '../actions/weather-action'
import classNames from 'classnames/bind'
import styles from './weather.scss'
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles)

const switchToMetric = (event) => {
  WeatherAction.switchToMetric()
  WeatherAction.searchWeather()
  event.preventDefault()
}

const switchToImperial = (event) => {
  WeatherAction.switchToImperial()
  WeatherAction.searchWeather()
  event.preventDefault()
}

const hasCurrent = R.both(
  R.is(Object),
  R.propIs(Object, 'current')
)

const shouldFocus = R.both(
  R.prop('focus'),
  R.complement(R.path(['current', 'unknown']))
)

const getCity = R.either(
  R.path(['current', 'name']),
  R.pipe(
    R.prop('city'),
    R.defaultTo('Weather')
  )
)

const getTitle = R.ifElse(
  R.is(Object),
  getCity,
  R.always('Weather')
)

const prependText = R.curry((before, text) => (
  (R.isNil(text))
    ? text
    : (before + text)
))

const appendText = R.curry((after, text) => (
  (R.isNil(text))
    ? text
    : (text + after)
))

const getCurrentIcon = R.pipe(
  R.path(['current', 'weather', '0', 'id']),
  prependText('owf owf-')
)

const roundTwoDecimal = (number) => (
  Math.round(number * 100) / 100
)

const roundNumber = R.when(
  R.is(Number),
  Math.round
)

const convertToKmPerHour = (mps) => (
  (R.is(Number, mps))
    ? roundTwoDecimal(mps * 3600 / 1000)
    : mps
)

const renderWeatherDetail = (text) => (
  !!text && (
    <span className={styles.detail}>
      { text }
    </span>
  )
)

const renderTemperature = R.pipe(
  R.path(['current', 'main', 'temp']),
  roundNumber,
  renderWeatherDetail
)

const getUnitsClass = (selected, units) => (
  cssModule({
    units: true,
    selected: selected === units
  })
)

const renderTemperatureUnit = ({ units }) => (
  <React.Fragment>
    <a
      className={getUnitsClass('metric', units)}
      onClick={switchToMetric}
    >
      {'°C'}
    </a>
    <span className={styles.separator}>
      {'|'}
    </span>
    <a
      className={getUnitsClass('imperial', units)}
      onClick={switchToImperial}
    >
      {'°F'}
    </a>
  </React.Fragment>
)

const renderCloudiness = R.pipe(
  R.path(['current', 'clouds', 'all']),
  prependText('Cloud: '),
  appendText(' %'),
  renderWeatherDetail
)

const renderHumidity = R.pipe(
  R.path(['current', 'main', 'humidity']),
  prependText('Humidity: '),
  appendText(' %'),
  renderWeatherDetail
)

const renderSpeedMetric = R.pipe(
  R.path(['wind', 'speed']),
  convertToKmPerHour,
  prependText('Wind: '),
  appendText(' km/h'),
  renderWeatherDetail
)

const renderSpeedImperial = R.pipe(
  R.path(['wind', 'speed']),
  prependText('Wind: '),
  appendText(' mph'),
  renderWeatherDetail
)

const renderSpeed = ({ units, current }) => (
  (units === 'metric')
    ? renderSpeedMetric(current)
    : renderSpeedImperial(current)
)

const getWeatherClass = (weather) => (
  cssModule({
    weather: true,
    focus: shouldFocus(weather),
    [getCurrentIcon(weather)]: true
  })
)

const renderWeather = (weather) => (
  hasCurrent(weather) && (
    <div className={getWeatherClass(weather)}>
      <div className={styles.temperature}>
        {renderTemperature(weather)}
        {renderTemperatureUnit(weather)}
      </div>
      <div className={styles.details}>
        {renderCloudiness(weather)}
        {renderHumidity(weather)}
        {renderSpeed(weather)}
      </div>
    </div>
  )
)

export const Weather = ({ weather }) => (
  <div className={styles.wrap}>
    <span className={styles.city}>
      {getTitle(weather)}
    </span>
    {renderWeather(weather)}
  </div>
)

export default createComponent(Weather, {
  country: CountryCodesStore,
  weather: WeatherStore
},
// auckland by default.
WeatherAction.init)
