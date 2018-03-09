import React from 'react'
import classNames from 'classnames/bind'
import styles from './page.scss'
import { Link } from 'bdux-react-router'

const cssModule = classNames.bind(styles)

const getPagePath = (page) => (
  `/${page}`
)

const isCurrent = (page, id) => (
  page === (id || '1')
)

const getPageClass = (page, id) => (
  cssModule({
    'page-number': true,
    'current': isCurrent(page, id)
  })
)

const renderPage = (page, id) => (
  <Link
    className={getPageClass(page, id)}
    to={getPagePath(page)}
  >
    {page}
  </Link>
)

export const Page = ({ match: { params }}) => (
  <div className={styles['page-numbers']}>
    {renderPage('1', params.id)}
    {renderPage('2', params.id)}
    {renderPage('3', params.id)}
  </div>
)

export default Page
