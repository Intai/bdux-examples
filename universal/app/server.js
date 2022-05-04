/* eslint-env node */

import './settings'
import fs from 'fs'
import * as R from 'ramda'
import Stream from 'stream'
import Express from 'express'
import DefaultRoot from './roots/default-root'

const app = Express()
const port = process.env.PORT || 8080

/*
app.set('view engine', 'ejs')
app.set('views', 'dist')

const renderApp = R.curry((root, req, res) => {
  res.render('server', {
    app: root.renderToString(req, res)
  })
})
*/

const renderApp = R.curry((root, req, res) => {
  fs.readFile('./dist/server.ejs', 'utf8', (err, file) => {
    if (err) {
      throw err
    }

    const [head, tail] = file.split('<%- app %>')
    res.write(head)
    const pipeable = root.renderToPipeableStream(req, res)
    const writable = new Stream.Writable({
      write: res.write.bind(res),
    })
    pipeable.pipe(writable)
    writable.on('finish', () => {
      res.write(tail)
      res.end()
    })
  })
})

app.use('/static', Express.static('dist'))
app.use('/favicon.ico', Express.static('dist'))
app.get('*', renderApp(DefaultRoot))

app.listen(port)
