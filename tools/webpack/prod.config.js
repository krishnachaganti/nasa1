import webpack from 'webpack';
import _debug from 'debug';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import isomorphicToolsConfig from './isomorphic.config';
import projectConfig from '../../src/config';
import paths from '../../src/config/paths';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);
const debug = _debug('app:webpack:config:prod');
const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');
const {
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__,
  __DEBUG__
} = projectConfig;
const VENDOR_DEPENDENCIES = [
  'react',
  'react-dom',
  'redux-thunk',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'material-ui',
  'react-helmet',
  'axios',
  'react-tap-event-plugin'
];
debug('Create configuration.');
const config = {
  context: paths.ROOT_DIR,
  devtool: 'source-map',
  entry: {
    app: projectConfig.BLDR_ENTRY,
    vendors: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths.DIST_DIR,
    filename: '[name]-[hash].js',
    publicPath: '/dist/'
  },
  resolve: {
    root: [paths.SRC_DIR],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: [paths.NODE_MODULES_DIR],
        include: [paths.SRC_DIR],
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        loader: ExtractTextPlugin.extract('style', `${cssLoader}!postcss!sass`),
        include: [paths.SRC_DIR],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      }
    ]
  },
  postcss: wPack => ([
    require('postcss-import')({ addDependencyTo: wPack }),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]),
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__,
      __DEBUG__
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),

    webpackIsomorphicToolsPlugin
  ]
};

export default config;
