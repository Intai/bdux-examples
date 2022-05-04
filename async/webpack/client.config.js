/* eslint-env node */

var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
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
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
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
