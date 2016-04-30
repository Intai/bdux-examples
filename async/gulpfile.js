'use strict';

var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    $ = require('gulp-load-plugins')(),
    files = './!(dist|build|node_modules)/**/*';

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('font', function() {
  return gulp.src('./fonts/**/*.{eot,otf,svg,ttf,woff,css}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('dev-server', function(callback) {
  new WebpackDevServer(webpack(require('./webpack/dev.config.js')), {
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(8080, 'localhost', function(err) {
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    $.util.log('[webpack-dev-server]', 'http://localhost:8080');
  });
});

gulp.task('build-client', function() {
  return gulp.src('app/main.js')
    .pipe(webpackStream(require('./webpack/client.config.js')))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-server', function() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js')))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod-server', function(cb) {
  var server = gls(['dist/server.js'], {
    env: process.env
  }, false);

  server.start();
  $.util.log('[express] http://localhost:8080');
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
