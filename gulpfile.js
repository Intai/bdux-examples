/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    port = process.env.PORT || 8080;

function font () {
  return gulp.src('./fonts/**/*.{eot,otf,svg,ttf,woff,woff2,css}')
    .pipe(gulp.dest('dist/fonts'));
}

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

const server = gulp.series(
  font,
  buildClient,
  buildServer,
  prod
)

gulp.task('server', server);

gulp.task('dev', gulp.series(
  font,
  dev
));

gulp.task('default', server);
