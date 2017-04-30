/* eslint-env node */

var gulp = require('gulp'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    $ = require('gulp-load-plugins')(),
    port = process.env.PORT || 8080;

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('dev-server', function(_callback) {
  new WebpackDevServer(webpack(webpackConfig), {
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

gulp.task('dev', [
  'dev-server'
]);

gulp.task('default', [
  'dev-server'
]);
