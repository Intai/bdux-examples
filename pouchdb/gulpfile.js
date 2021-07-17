/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    fs = require('fs'),
    spawn = require('child_process').spawn,
    port = process.env.PORT || 8080;

function dev() {
  new WebpackDevServer(webpack(require('./webpack/dev.config.js')), {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(port, '0.0.0.0', function(err) {
    if (err) throw new PluginError('webpack-dev-server', err);
    log('[webpack-dev-server]', 'http://localhost:' + port);
  });
}

function buildClient() {
  return gulp.src('app/index.jsx')
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('dist'));
}

function buildServer() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('dist'));
}

function prod() {
  var server = gls('dist/server.js', {
    env: process.env
  }, false);

  server.start();
  log('[express]', 'http://localhost:' + port);
}

function initPouchdb() {
  if (!fs.existsSync('pouchdb')) {
    return gulp.src('pouchdb_init/**/*')
      .pipe(gulp.dest('pouchdb'));
  }
}

function pouchdbServer() {
  spawn('./node_modules/pouchdb-server/bin/pouchdb-server', [
    '--port', '5984',
    '--host', '0.0.0.0',
    '--dir', './pouchdb',
    '--config', './pouchdb.json'
  ], {
    stdio: 'inherit'
  });
}

const server = gulp.series(
  buildClient,
  buildServer,
  prod,
  initPouchdb,
  pouchdbServer
)

gulp.task('server', server);

gulp.task('dev', gulp.series(
  dev,
  initPouchdb,
  pouchdbServer
));

gulp.task('default', server);
