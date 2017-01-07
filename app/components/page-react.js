import React from 'react'
import classNames from 'classnames/bind'
import styles from './page-react.scss'
import { Link } from 'bdux-react-router'

const cssModule = classNames.bind(styles)

const getPagePath = (page) => (
  '/' + page
)

const isCurrent = (page, id) => (
  page === (id || '1')
)

const renderPage = (page, id) => (
  <Link to={ getPagePath(page) }
    className={ cssModule({
      'page-number': true,
      'current': isCurrent(page, id) }) }>
    { page }
  </Link>
)

export const Page = ({ params }) => (
  <div className={ cssModule({
      'page-numbers': true }) }>
    { renderPage('1', params.id) }
    { renderPage('2', params.id) }
    { renderPage('3', params.id) }
  </div>
)

export default Page
