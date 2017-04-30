/* eslint-env node */

var gulp = require('gulp'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    $ = require('gulp-load-plugins')(),
    mergeStream = require('merge-stream'),
    spawn = require('child_process').spawn,
    nativeStyles = ['app/**/*.!(web).scss', 'app/**/+([^.]).scss'],
    port = process.env.PORT || 8080;

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

gulp.task('packager', function(callback) {
  var cmd = spawn('node', [
    'node_modules/react-native/local-cli/cli.js',
    'start'
  ], {
    stdio: 'inherit'
  });

  cmd.on('close', callback);
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
    $.util.log('[webpack-dev-server]', 'http://localhost:' + port + '\n');
  });
});

gulp.task('dev-native', [
  'packager'
]);

gulp.task('dev-web', [
  'dev-server'
]);

gulp.task('dev', [
  'dev-web',
  'dev-native'
]);

gulp.task('default', [
  'dev'
]);
