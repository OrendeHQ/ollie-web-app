'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.resolve('client');
var DIST_DIR = path.resolve('dist');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    SRC_DIR + '/index.jsx'
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
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
