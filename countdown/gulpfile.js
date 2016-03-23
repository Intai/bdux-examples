'use strict';

var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    $ = require('gulp-load-plugins')(),
    files = './!(dist|build|node_modules)/**/*';

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('webpack', function() {
  return gulp.src('app/main.js')
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack-dev-server', function(callback) {
  new WebpackDevServer(webpack(webpackConfig), {
    noInfo: true,
    hot: true
  })
  .listen(8080, 'localhost', function(err) {
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    $.util.log('[webpack-dev-server]', 'http://localhost:8080');
  });
});

gulp.task('watch', function() {
  gulp.watch(files + '.js', ['webpack']);
});

gulp.task('build', [
  'webpack'
]);

gulp.task('server', [
  'webpack-dev-server'
]);

gulp.task('default', [
  'server'
]);
