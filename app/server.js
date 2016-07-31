/* eslint-env node */

import './settings';
import R from 'ramda';
import Express from 'express';
import DefaultRoot from './roots/default-root';

const app = Express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', 'dist');

const renderHtml = R.curry((res, html) => {
  res.render('server', {
    app: html
  });
});

const renderApp = R.curry((root, req, res) => {
  let dispose = root.renderToString(req, res)
    .map(renderHtml(res))
    .onValue(() => dispose());
});

app.use('/static', Express.static('dist'));
app.get('*', renderApp(DefaultRoot));

app.listen(port);
