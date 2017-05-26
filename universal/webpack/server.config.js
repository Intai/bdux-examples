/* eslint-env node */

var R = require('ramda'),
    path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
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
  stats: { children: false },
  entry: [
    './server'
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: [
        'css/locals?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass'
      ]
    }]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  },
  postcss: [
    autoprefixer
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};
