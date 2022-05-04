/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    spawn = require('child_process').spawn,
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server');

function dev() {
  const port = process.env.PORT || 80
  const compiler = webpack(require('./webpack/dev.config.js'))

  new WebpackDevServer({
    port,
    host: '0.0.0.0',
    historyApiFallback: true,
  }, compiler)
    .startCallback(err => {
      if (err) throw new PluginError('webpack-dev-server', err)
      log('[webpack-dev-server]', 'http://localhost:' + port)
    })
}

function buildClient() {
  return gulp.src('app/index.jsx')
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('dist'));
}

function buildServer() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('dist'));
}

function prod(cb) {
  const port = process.env.PORT || 8080
  const cmd = spawn('node', [
    'dist/server.js',
  ], {
    stdio: 'inherit',
  })

  log('[express]', 'http://localhost:' + port)
  cmd.on('close', cb)
}

const server = gulp.series(
  buildClient,
  buildServer,
  prod
)

gulp.task('server', server);

gulp.task('dev', dev);

gulp.task('default', server);
