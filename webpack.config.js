const webpack = require('webpack')
const path = require('path')

const context = path.join(__dirname, 'src')

module.exports = function(env) {
  const nodeEnv = process.env.NODE_ENV
  const isProd = nodeEnv === 'production'

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    )
  }

  const filename = isProd ?
    './url-search-utils.min.js' :
    './url-search-utils.js'

  return {
    context,
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename,
      library: 'URLSearchUtils',
      libraryTarget: 'umd',
    },
    plugins,
    module: {
      rules: [{
        test: /(\.js)/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      }],
    },
    resolve: {
      modules: [
        context,
        'node_modules',
      ],
      extensions: ['.js'],
    },
  }
}
