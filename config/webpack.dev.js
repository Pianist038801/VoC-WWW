var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://1cee8086.ngrok.io/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [new ExtractTextPlugin('[name].css')],

  devServer: {
    inline: true,
    historyApiFallback: true,
    stats: 'minimal'
  }
});
