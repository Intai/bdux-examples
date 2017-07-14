import React from 'react'
import { Link } from 'bdux-react-router'
import { createComponent } from 'bdux'

const getHref = ({ year, month, day, slug }) => (
  `/${year}/${month}/${day}/${slug}`
)

const renderLink = (entry) => (
  <Link to={getHref(entry)}>
    {entry.title}
  </Link>
)

const BlogEntry = ({ entry }) => (
  <div>
    {renderLink(entry)}
    {entry.createdAt}
    {entry.content}
  </div>
)

export default createComponent(BlogEntry)
