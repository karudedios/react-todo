const { resolve } = require('path');
const webpack     = require('webpack');
const HappyPack   = require('happypack');
const HtmlWebpack = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-maps',

  entry: {
    'index': './src/index.js',
    'vendor': './src/vendor.js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    unsafeCache: /node_modules/,
    modules: [resolve('src'), 'node_modules'],

    alias: {
      'services': resolve('src', 'services')
    }
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: resolve('public')
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,

      include: /src/,
      exclude: /node_modules/,

      use: ['happypack/loader?id=js']
    }, {
      test: /\.styl$/,

      include: /src/,
      exclude: /node_modules/,

      use: ExtractText.extract({
        use: ['happypack/loader?id=stylus']
      }),
    }, {
      test: /\.html$/,

      include: /src/,
      exclude: /node_modules/,

      use: 'html-loader'
    }]
  },

  plugins: [
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [
        'babel-loader?retainLines&cacheDirectory',
        'eslint-loader?cache&emitError&emitWarning'
      ]
    }),

    new HappyPack({
      id: 'stylus',
      threads: 2,
      loaders: [
        'css-loader',
        'stylus-loader'
      ]
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChuncks(module, count) {
        return count < 2;
      }
    }),

    new ExtractText('./css/app.css'),

    new HtmlWebpack({
      path: resolve('public'),
      template: resolve('src/index.html')
    })
  ]
};
