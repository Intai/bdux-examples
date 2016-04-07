import R from 'ramda';
import Express from 'express';
import { createDefaultApp } from './roots/server-default';
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', 'dist');

const renderApp = R.curry((createElement, req, res) => {
  res.render('server', {
    app: renderToString(
      createElement(req, res))
  });
});

app.use('/static', Express.static('dist'));
app.get('*', renderApp(createDefaultApp));

app.listen(port)
