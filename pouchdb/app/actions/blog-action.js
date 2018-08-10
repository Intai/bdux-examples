import * as R from 'ramda'
import StoreNames from '../stores/store-names'
import { PouchDBAction } from 'bdux-pouchdb'

const parseInt10 = (value) => (
  parseInt(value, 10)
)

const createSelector = R.pipe(
  R.filter(R.identity),
  R.assoc('createdAt', { '$gte': 0 }),
  R.evolve({
    year: parseInt10,
    month: parseInt10,
    day: parseInt10
  })
)

const sortIndices = R.sortBy(
  R.flip(R.indexOf)(['createdAt', 'year', 'month', 'day', 'slug'])
)

export const load = ({ props: { match: { params }}}) => {
  const selector = createSelector(params)
  const indices = sortIndices(R.keys(selector))

  return PouchDBAction.replicate({
    src: 'http://localhost:5984/blog',
    target: 'blog',
    options: {
      auth: {
        username: 'guest',
        password: 'guest'
      },
      filter: 'blog/filter_entries',
      query_params: params
    }
  })
  .createIndex({
    index: {
      fields: indices
    }
  })
  .find({
    selector,
    sort: [{ createdAt: 'desc' }]
  })
  .to({
    storeName: StoreNames.BLOG,
  })
  .create()
}
