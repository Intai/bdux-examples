'use strict';

var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    $ = require('gulp-load-plugins')(),
    spawn = require('child_process').spawn,
    files = './!(dist|build|node_modules)/**/*';

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('packager', function(cb) {
  var cmd = spawn('node', [
    'node_modules/react-native/local-cli/cli.js',
    'start'
  ], {
    stdio: 'inherit'
  });

  cmd.on('close', cb);
});

gulp.task('dev-server', function(cb) {
  new WebpackDevServer(webpack(webpackConfig), {
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(8080, 'localhost', function(err) {
    if (err) throw new $.util.PluginError('webpack-dev-server', err);
    $.util.log('[webpack-dev-server]', 'http://localhost:8080\n');
  });
});

gulp.task('dev-native', [
  'packager'
]);

gulp.task('dev-web', [
  'dev-server'
]);

gulp.task('default', [
  'packager',
  'dev-server'
]);
