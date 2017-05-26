/* eslint-env node */

var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './main'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../app/index.ejs',
      inject: false,
      files: {
        css: [],
        js: ['/dev.js']
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
        'style',
        'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass'
      ]
    }]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'dev.js'
  },
  postcss: [
    autoprefixer
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};
