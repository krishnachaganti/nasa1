/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lost = require('lost');
// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

module.exports = require('./webpack.base.babel')({
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'src/client/app.jsx') // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  // Load the CSS in a style tag in development
  cssLoaders: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss!sass?sourceMap',

  // Process the CSS with PostCSS
  postcssPlugins: [
    lost(),
    postcssFocus(), // Add a :focus to every :hover
    cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'] // ...based on this browser list
    }),
    postcssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true
    })
  ],

  // Add hot reloading
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      inject: true // Inject all files that are generated by webpack, e.g. bundle.js
    })
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    presets: ['react-hmre']
  },

  // Emit a source map for easier debugging
  devtool: 'inline-source-map'
});