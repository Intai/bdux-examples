/* eslint-env node */

var gulp = require('gulp'),
    log = require('fancy-log'),
    PluginError = require('plugin-error'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    port = process.env.PORT || 8080

function dev() {
  new WebpackDevServer(webpack(webpackConfig), {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    hot: true
  })
  .listen(port, '0.0.0.0', function(err) {
    if (err) throw new PluginError('webpack-dev-server', err)
    log('[webpack-dev-server]', 'http://localhost:' + port)
  })
}

gulp.task('dev', gulp.series(
  dev
))

gulp.task('default', gulp.series(
  dev
))
