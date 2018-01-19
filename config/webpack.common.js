var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
      'app': './src/main.js',
      'vendor': './src/vendor.js'
    },

    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css']
    },

    module: {
        loaders: [
            {
              test: /\.css$/,
              enforce: 'pre',
              use: [
                'style-loader',
                'css-loader',
              ]
            },
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
            },
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react', 'stage-2']
              }
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]?'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=images/[name].[ext]?'
            },
            {
              test: /bootstrap\/dist\/js\/umd\//,
              use: 'imports-loader?jQuery=jquery'
            },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default'],
        }),

        new CopyWebpackPlugin([
          {
            from: 'src/assets/images/',
            to: 'images/'
          },
          {
            from: 'src/assets/jsons/',
            to: 'jsons/'
          },
          {
            from: 'src/assets/js/',
            to: 'js/'
          }
        ]),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: false
                }
            }
        })
    ]
};
