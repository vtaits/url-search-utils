const webpack = require('webpack')
const path = require('path')

const context = path.join(__dirname, 'src')

module.exports = {
  context,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /(\.js)/,
      exclude: /(node_modules|dist)/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  resolve: {
    alias: {
      'url-search-utils': path.join(__dirname, '../../dist/url-search-utils.js'),
    },
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js'],
  },
}
