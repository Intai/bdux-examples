/* eslint-env node */

var R = require('ramda'),
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    fs = require('fs');

var isNotSystem = function(name) {
  return !/^(\.|bdux)/.test(name)
};

var getExternalPair = function(name) {
  return [name, 'commonjs ' + name];
};

var getExternalObject = R.pipe(
  R.filter(isNotSystem),
  R.map(getExternalPair),
  R.fromPairs
);

var getExternals = function() {
  return getExternalObject(
    fs.readdirSync(path.join(__dirname, '../node_modules')));
};

module.exports = {
  target: 'node',
  externals: getExternals(),
  context: path.join(__dirname, '../app'),
  entry: [
    './server'
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'server.ejs',
      template: '../app/index.ejs',
      app: '<%- app %>',
      inject: false,
      minify: {
        collapseWhitespace: true
      },
      files: {
        css: ['/static/client.css'],
        js: ['/static/client.js']
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  }
};
