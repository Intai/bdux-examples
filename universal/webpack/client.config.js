/* eslint-env node */

var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '../app'),
  entry: [
    './index'
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'client.css'
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
          MiniCssExtractPlugin.loader,
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
  stats: {
    children: false
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'client.js'
  }
};
