/* eslint-env node */

var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '../app'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          configFile: '.eslintrc'
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'dev.js'
  }
};
