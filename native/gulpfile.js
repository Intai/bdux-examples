/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
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
  return !/\/_[^/]*$/.test(file.relative);
};

var replaceDir = function(file) {
  file.base = file.base.replace(/app\/.*$/, 'app/');
  return file;
};

var replaceDest = function(file) {
  file.path = file.path.replace(/([^/]*)$/, 'generated/$1');
  return file;
};

gulp.task('image', function() {
  return gulp.src('./images/**/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'));
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

function packager(callback) {
  var cmd = spawn('node', [
    'node_modules/react-native/local-cli/cli.js',
    'start'
  ], {
    stdio: 'inherit'
  });

  cmd.on('close', callback);
}

function dev() {
  new WebpackDevServer(webpack(webpackConfig), {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(port, '0.0.0.0', function(err) {
    if (err) throw new PluginError('webpack-dev-server', err);
    log('[webpack-dev-server]', 'http://localhost:' + port + '\n');
  });
}

gulp.task('dev-web', gulp.series(
  dev
));

gulp.task('dev-native', gulp.series(
  packager
));

gulp.task('dev', gulp.series(
  dev,
  packager
));

gulp.task('default', gulp.series(
  dev,
  packager
));
