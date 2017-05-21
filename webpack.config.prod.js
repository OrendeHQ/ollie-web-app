'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.resolve('client');
var DIST_DIR = path.resolve('dist');

module.exports = {
  entry: [ SRC_DIR + '/index.jsx' ],
  output: {
    path: DIST_DIR,
    filename: 'bundle-[hash].js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loaders: ['babel-loader']
      }
    ]
  }
};
