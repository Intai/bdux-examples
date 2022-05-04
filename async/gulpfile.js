/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    path = require('path'),
    spawn = require('child_process').spawn,
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    port = process.env.PORT || 8080

function font () {
  return gulp.src('./fonts/**/*.{eot,otf,svg,ttf,woff,woff2,css}')
    .pipe(gulp.dest('dist/fonts'))
}

function dev() {
  const port = process.env.PORT || 80
  const compiler = webpack(require('./webpack/dev.config.js'))

  new WebpackDevServer({
    port,
    host: '0.0.0.0',
    historyApiFallback: true,
    static: [{
      directory: path.join(__dirname, './fonts'),
      publicPath: '/fonts'
    }]
  }, compiler)
    .startCallback(err => {
      if (err) throw new PluginError('webpack-dev-server', err)
      log('[webpack-dev-server]', 'http://localhost:' + port)
    })
}

function buildClient() {
  return gulp.src('app/index.jsx')
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('dist'))
}

function buildServer() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('dist'))
}

function prod(cb) {
  var cmd = spawn('node', [
    'dist/server.js'
  ], {
    stdio: 'inherit'
  })

  log('[express]', 'http://localhost:' + port)
  cmd.on('close', cb)
}

gulp.task('dev', gulp.series(
  font,
  dev
))

gulp.task('build', gulp.series(
  font,
  buildClient,
  buildServer
))

gulp.task('default', gulp.series(
  font,
  buildClient,
  buildServer,
  prod
))
