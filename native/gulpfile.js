'use strict';

var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    $ = require('gulp-load-plugins')(),
    mergeStream = require('merge-stream'),
    spawn = require('child_process').spawn,
    nativeStyles = ['app/**/*.!(web).scss', 'app/**/+([^.]).scss'];

var mergeInheritance = function(stream, file) {
  return mergeStream(
    gulp.src(file.path),
    gulp.src(file.path)
      .pipe($.sassInheritance({ dir: 'app' }))
  );
};

var isNotPartial = function(file) {
  return !/\/_[^\/]*$/.test(file.relative);
};

var replaceDir  = function(file) {
  file.base = file.base.replace(/app\/.*$/, 'app/');
  return file;
};

var replaceDest  = function(file) {
  file.path = file.path.replace(/([^\/]*)$/, 'generated/$1');
  return file;
};

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function () {
  require('del').sync('dist');
});

gulp.task('sass', function() {
  return gulp.src(nativeStyles)
    .pipe($.cached('sass'))
    .pipe($.flatmap(mergeInheritance))
    .pipe($.filter(isNotPartial))
    .pipe($.map(replaceDir))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.reactNativeStylesheetCss())
    .pipe($.map(replaceDest))
    .pipe(gulp.dest('app'));
});

gulp.task('sass-watch', function(){
  gulp.watch(nativeStyles, ['sass']);
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
  'dev-web',
  'dev-native'
]);
