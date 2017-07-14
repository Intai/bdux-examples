import R from 'ramda'
import React from 'react'
import Menu from './menu'
import BlogStore from '../stores/blog-store'
import BlogEntry from './entry'
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
  <div>
    <Menu />
    {renderEntries(blog)}
  </div>
)

export default createComponent(Blog, {
  blog: BlogStore
})
