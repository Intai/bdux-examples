/* eslint-env node */

import './settings'
import fs from 'fs'
import * as R from 'ramda'
import * as Bacon from 'baconjs'
import Express from 'express'
import DefaultRoot from './roots/default-root'

const app = Express()
const port = process.env.PORT || 8080

const renderHtml = res => stream => {
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
}

const renderApp = root => (req, res) => {
  root.renderToNodeStream(req, res)
    .map(renderHtml(res))
    .subscribe(R.always(Bacon.noMore))
}

app.use('/static', Express.static('dist'))
app.use('/favicon.ico', Express.static('dist'))
app.get('*', renderApp(DefaultRoot))

app.listen(port)
