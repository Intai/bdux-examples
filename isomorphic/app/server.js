import Express from 'express';
import React from 'react';
import App from './components/app-react.js';
import { createLocationHistory } from 'bdux-react-router';
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', 'dist');

app.use('/static', Express.static('dist'));
app.get('*', (req, res) => {
  createLocationHistory(req.path);
  const app = (<App />);

  res.render('server', {
    app: renderToString(app)
  });
});

app.listen(port)
