/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

function dev() {
  const port = process.env.PORT || 8080
  const compiler = webpack(require('./webpack.config.js'))

  new WebpackDevServer({
    port,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  }, compiler)
    .startCallback(err => {
      if (err) throw new PluginError('webpack-dev-server', err)
      log('[webpack-dev-server]', 'http://localhost:' + port)
    })
}

gulp.task('dev', gulp.series(
  dev
));

gulp.task('default', gulp.series(
  dev
));
