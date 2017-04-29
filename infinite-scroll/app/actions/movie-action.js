import R from 'ramda'
import Bacon from 'baconjs'
import fetch from 'isomorphic-fetch'
import uriTemplates from 'uri-templates'
import ActionTypes from './action-types'
import { bindToDispatch } from 'bdux'

const RESULTS_PER_PAGE = 20
const APP_KEY = '5ca7d322b2286fb4baa5d46af38c4fca'
const URI_MOVIEDB = uriTemplates('https://api.themoviedb.org/3/discover/movie{?sort_by,page,api_key}')

const createJsonStream = (response) => (
  Bacon.fromPromise(response.json())
)

const getDataByOffset = R.uncurryN(2, (offset) => R.pipe(
  R.pathOr({}, ['results', offset]),
  R.pick(['title'])
))

const createMovie = R.curry((index, offset, data) => ({
  type: ActionTypes.MOVIE_LOAD,
  data: getDataByOffset(offset, data),
  index
}))

const createPageStream = R.memoize((page) => {
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
    .first()
)

export const load = ({ props: { index }}) => (
  createMovieStreamByPage(
    index,
    Math.floor(index / RESULTS_PER_PAGE) + 1,
    index % RESULTS_PER_PAGE
  )
)

export default bindToDispatch({
  load
})
