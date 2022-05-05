/* eslint-env node */

var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    isEnvProd = (process.env.NODE_ENV === 'production');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'app'),
  entry: [
    'index'
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      index: path.join(__dirname, 'app',
        isEnvProd ? 'index.prod' : 'index.dev')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
