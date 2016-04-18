import R from 'ramda';
import Bacon from 'baconjs';
import fetch from 'isomorphic-fetch';
import ActionTypes from './action-types';
import { bindToDispatch } from 'bdux';

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
);

const createCodesStream = () => (
  Bacon.fromPromise(
    fetch('http://data.okfn.org/data/core/country-list/r/data.json', {
      method: 'GET',
      mode: 'cors',
      timeout: 5000
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always([]))
);

const createLoad = (codes) => ({
  type: ActionTypes.COUNTRY_CODES_LOAD,
  codes: codes
});

export const load = () => (
  createCodesStream()
    .map(createLoad)
);

export const select = (code) => ({
  type: ActionTypes.COUNTRY_CODES_SELECT,
  code: code
});

const selectDefault = R.partial(
  select, ['NZ']
);

const createInitStream = () => (
  Bacon.mergeAll(
    // select new zealand by default.
    Bacon.once(selectDefault()),
    // fetch country codes from internet.
    load()
  )
);

export const init = R.ifElse(
  R.pipe(R.path(['country', 'codes']), R.isNil),
  createInitStream,
  selectDefault
);

export default bindToDispatch({
  init,
  load,
  select
});
