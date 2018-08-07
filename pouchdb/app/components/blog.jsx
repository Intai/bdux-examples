import * as R from 'ramda'
import React from 'react'
import Menu from './menu'
import * as BlogAction from '../actions/blog-action'
import BlogStore from '../stores/blog-entries-store'
import BlogEntry from './entry'
import { pureRender } from './decorators/pure-render'
import { createComponent } from 'bdux'

const renderEntry = (entry) => (
  <BlogEntry
    entry={entry}
    key={entry._id}
  />
)

const renderEntries = (blog) => (
  !!blog && (
    R.map(renderEntry, blog)
  )
)

export const Blog = ({ blog }) => (
  <React.Fragment>
    <Menu />
    {renderEntries(blog)}
  </React.Fragment>
)

const decorate = R.pipe(
  pureRender,
  createComponent(
    {
      blog: BlogStore
    },
    // fetch and replicate blog entries.
    BlogAction.load
  )
)

export default decorate(Blog)
