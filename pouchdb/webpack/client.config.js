/* eslint-env node */

var path = require('path'),
    webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '../app'),
  entry: [
    './index'
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
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
    path: path.join(__dirname, '../dist'),
    filename: 'client.js'
  }
};
