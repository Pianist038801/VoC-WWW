var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        ie8: false,
        ecma: 6,
        warnings: true,
        mangle: true, // debug false
        output: {
          comments: false,
          beautify: false,  // debug true
        }
      },
      warnings: true,
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].css')
  ]
});
