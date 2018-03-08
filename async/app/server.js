/* eslint-env node */

import './settings'
import fs from 'fs'
import * as R from 'ramda'
import Bacon from 'baconjs'
import Express from 'express'
import DefaultRoot from './roots/default-root'

const app = Express()
const port = process.env.PORT || 8080

/*
app.set('view engine', 'ejs')
app.set('views', 'dist')

const renderHtml = R.curry((res, html) => {
  res.render('server', {
    app: html
  })
})

const renderApp = R.curry((root, req, res) => {
  root.renderToString(req, res)
    .map(renderHtml(res))
    .subscribe(R.always(Bacon.noMore))
})
*/

const renderHtml = R.curry((res, stream) => {
  fs.readFile('./dist/server.ejs', 'utf8', (err, file) => {
    if (err) {
      throw err
    }

    const [head, tail] = file.split('<%- app %>')
    res.write(head)
    stream.pipe(res, { end: false })
    stream.on('end', () => {
      res.write(tail)
      res.end()
    })
  })
})

const renderApp = R.curry((root, req, res) => {
  root.renderToNodeStream(req, res)
    .map(renderHtml(res))
    .subscribe(R.always(Bacon.noMore))
})

app.use('/static', Express.static('dist'))
app.get('*', renderApp(DefaultRoot))

app.listen(port)
