var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './main.web'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      inject: false,
      files: {
        js: ['/bundle.js']
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
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=3&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass',
        'jsontosass?path=./app/components/_variables.json'
      ]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  postcss: [
    autoprefixer
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};
