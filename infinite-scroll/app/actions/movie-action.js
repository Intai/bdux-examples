import * as R from 'ramda'
import Bacon from 'baconjs'
import fetch from 'isomorphic-fetch'
import uriTemplates from 'uri-templates'
import ActionTypes from './action-types'

const RESULTS_PER_PAGE = 20
const APP_KEY = '5ca7d322b2286fb4baa5d46af38c4fca'
const URI_MOVIEDB = uriTemplates('https://api.themoviedb.org/3/discover/movie{?sort_by,page,api_key}')
const URI_MOVIEDB_CONFIG = uriTemplates('https://api.themoviedb.org/3/configuration{?api_key}')

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
)

const createConfig = (data) => ({
  type: ActionTypes.MOVIE_CONFIG,
  data
})

const getDataByOffset = R.uncurryN(2, (offset) => R.pipe(
  R.pathOr({}, ['results', offset]),
  R.pick(['title', 'poster_path', 'release_date', 'vote_average', 'overview'])
))

const createMovie = R.curry((index, offset, data) => ({
  type: ActionTypes.MOVIE_LOAD,
  data: getDataByOffset(offset, data),
  index
}))

const createPageStream = R.memoizeWith(R.identity, (page) => {
  const params = {
    page,
    sort_by: 'popularity.desc',
    api_key: APP_KEY
  }

  return Bacon.fromPromise(
    fetch(URI_MOVIEDB.fill(params), {
      method: 'GET',
      timeout: 5000
    })
  )
  .flatMap(createJsonStream)
  .mapError(R.always({}))
  .toProperty()
})

const createMovieStreamByPage = (index, page, offset) => (
  createPageStream(page)
    .map(createMovie(index, offset))
    .toEventStream()
    .first()
)

export const config = () => (
  Bacon.fromPromise(
    fetch(URI_MOVIEDB_CONFIG.fill({
      api_key: APP_KEY
    }), {
      method: 'GET',
      timeout: 5000
    })
  )
  .flatMap(createJsonStream)
  .map(R.pick(['images']))
  .map(createConfig)
)

export const load = ({ props: { index }}) => (
  createMovieStreamByPage(
    index,
    Math.floor(index / RESULTS_PER_PAGE) + 1,
    index % RESULTS_PER_PAGE
  )
)
