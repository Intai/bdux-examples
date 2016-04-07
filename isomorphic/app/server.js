import Express from 'express';
import React from 'react';
import App from './components/app-react.js';
import { LocationAction } from 'bdux-react-router';
import { renderToString } from 'react-dom/server';

const app = Express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', 'dist');

app.use('/static', Express.static('dist'));
app.get('*', (req, res) => {
  const app = (<App />);
  LocationAction.push(req.path);

  res.render('server', {
    app: renderToString(app)
  });
});

app.listen(port)
