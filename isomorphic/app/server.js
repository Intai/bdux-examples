import Express from 'express';
import React from 'react';
import App from './components/app-react.js';
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', 'dist');

app.use('/static', Express.static('dist'));
app.get('*', (req, res) => {
  res.render('server', {
    app: renderToString(<App />)
  });
});

app.listen(port)
