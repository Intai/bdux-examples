/* eslint-env node */

var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    PluginError = require('plugin-error'),
    log = require('fancy-log'),
    $ = require('gulp-load-plugins')(),
    spawn = require('child_process').spawn,
    port = process.env.PORT || 8080;

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('dev-server', function() {
  new WebpackDevServer(webpack(require('./webpack/dev.config.js')), {
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(port, '0.0.0.0', function(err) {
    if (err) throw new PluginError('webpack-dev-server', err);
    log('[webpack-dev-server]', 'http://localhost:' + port);
  });
});

gulp.task('build-client', function() {
  return gulp.src('app/main.js')
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-server', function() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod-server', function() {
  var server = gls(['dist/server.js'], {
    env: process.env
  }, false);

  server.start();
  log('[express] http://localhost:' + port);
});

gulp.task('pouchdb-server', function() {
  spawn('./node_modules/pouchdb-server/bin/pouchdb-server', [
    '--port', '5984',
    '--host', '0.0.0.0',
    '--dir', './pouchdb',
    '--config', './pouchdb.json'
  ], {
    stdio: 'inherit'
  });
});

gulp.task('build', [
  'build-client',
  'build-server'
]);

gulp.task('server', $.sequence(
  'build',
  'prod-server',
  'pouchdb-server'
));

gulp.task('dev', [
  'dev-server',
  'pouchdb-server'
]);

gulp.task('default', [
  'server'
]);
