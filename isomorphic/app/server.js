//import path from 'path';
import express from 'express';
import mustache from 'mustache-express';
import React from 'react';
import App from './components/app-react.js';
import { renderToString } from 'react-dom/server';

const app = express();
const port = 8080;

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', 'app');

app.use('/', express.static('dist'));
app.get('*', (req, res) => {
  res.render('index', {
    app: renderToString(<App />)
  });
});

app.listen(port)
