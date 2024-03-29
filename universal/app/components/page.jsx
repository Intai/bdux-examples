import React from 'react'
import Message from './message'
import classNames from 'classnames/bind'
import styles from './page.scss'
import { Link } from 'bdux-react-router'
import { useParams } from 'react-router'

const cssModule = classNames.bind(styles)

const getPagePath = (page) => (
  '/' + page
)

const isCurrent = (page, id) => (
  page === (id || '1')
)

const getContainerClass = () => (
  cssModule({
    'page-numbers': true
  })
)

const getPageClass = (page, id) => (
  cssModule({
    'page-number': true,
    'current': isCurrent(page, id)
  })
)

const renderPage = (page, id) => (
  <Link
    as="a"
    className={getPageClass(page, id)}
    to={getPagePath(page)}
  >
    {page}
  </Link>
)

export const Page = () => {
  const params = useParams();
  return (
    <>
      <div className={getContainerClass()}>
        {renderPage('1', params.id)}
        {renderPage('2', params.id)}
        {renderPage('3', params.id)}
      </div>
      <Message />
    </>
  )
}

export default Page
