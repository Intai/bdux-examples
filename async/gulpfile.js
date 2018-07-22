/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    $ = require('gulp-load-plugins')(),
    port = process.env.PORT || 8080;

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('font', function() {
  return gulp.src('./fonts/**/*.{eot,otf,svg,ttf,woff,woff2,css}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('dev-server', function(_callback) {
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
});

gulp.task('build-client', function() {
  return gulp.src('app/index.jsx')
    .pipe(webpackStream(require('./webpack/client.config.js')))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-server', function() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js')))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod-server', function(_callback) {
  var server = gls('dist/server.js', {
    env: process.env
  }, false);

  server.start();
  log('[express] http://localhost:' + port);
});

gulp.task('build', $.sequence(
  'font', [
    'build-client',
    'build-server'
  ]
));

gulp.task('server', $.sequence(
  'build',
  'prod-server'
));

gulp.task('dev', $.sequence(
  'font',
  'dev-server'
));

gulp.task('default', [
  'server'
]);
