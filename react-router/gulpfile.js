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

gulp.task('dev-server', function(callback) {
  new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(process.env.PORT || 8080, '0.0.0.0', function(err) {
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    $.util.log('[webpack-dev-server]', 'http://localhost:' + process.env.PORT);
  });
});

gulp.task('dev', [
  'dev-server'
]);

gulp.task('default', [
  'dev-server'
]);
