var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  entry: [
    './main'
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('client.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ],
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
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]'+
        '!postcss'+
        '!sass'
      )
    }]
  },
  stats: {
    children: false
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'client.js'
  },
  postcss: [
    autoprefixer
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};
