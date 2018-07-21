/* eslint-env node */

var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    $ = require('gulp-load-plugins')(),
    port = process.env.PORT || 8080;

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('./dist/images'));
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
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    $.util.log('[webpack-dev-server]', 'http://localhost:' + port);
  });
});

gulp.task('build-client', function() {
  return gulp.src('app/main.js')
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-server', function() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task('prod-server', function(_callback) {
  var server = gls('dist/server.js', {
    env: process.env
  }, false);

  server.start();
  $.util.log('[express] http://localhost:' + port);
});

gulp.task('build', [
  'build-client',
  'build-server'
]);

gulp.task('server', $.sequence(
  'build',
  'prod-server'
));

gulp.task('dev', [
  'dev-server'
]);

gulp.task('default', [
  'server'
]);
