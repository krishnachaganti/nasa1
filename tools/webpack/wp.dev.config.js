import path from 'path';
import _debug from 'debug';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import isomorphicToolsConfig from './isomorphic.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import appCfg from '../../src/config';
import paths from '../../src/config/paths';

const debug = _debug('app:webpack:config:dev');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig);

const deps = [
  'react-router-redux/dist/ReactRouterRedux.min.js',
  'redux/dist/redux.min.js'
];
const VENDOR_DEPENDENCIES = [
  'react',
  'react-dom',
  'redux-thunk',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
];
const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=2',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

const babelLoaderConfiguration = {
  cacheDirectory: false,
  plugins: [
    ['transform-runtime', { polyfill: false, regenerator: false }],
    'transform-decorators-legacy',
    ['babel-plugin-module-alias', [
      { src: './src/config', expose: 'config' },
      { src: './src/app', expose: 'app' },
      { src: './src/app/shared', expose: 'shared' },
      { src: './src/app/state', expose: 'state' },
      { src: './src/app/scenes', expose: 'scenes' },
      { src: './src/app/components', expose: 'components' },
      { src: './src/server', expose: 'server' }
    ]]
  ],
  presets: ['es2015', 'react', 'stage-0']

};
const {
  SERVER_HOST,
  BLDR_ENTRY,
  WEBPACK_DEV_SERVER_PORT,
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__,
  __DEBUG__
} = appCfg;

const HOT_MW_PATH = `http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}/__webpack_hmr`;
const HOT_MW = `webpack-hot-middleware/client?path=${HOT_MW_PATH}&reload=true&timeout=20000`;
const extractCSS = new ExtractTextPlugin('[name].css', { allChunks: true });
function extendCSSLoaders(loaders) {
  if (__DEV__) {
    loaders.unshift('style-loader');
    return loaders.join('!');
  }
  // move css to separate file
  return extractCSS.extract('style-loader', loaders.join('!'), {
    publicPath: './' // make css image urls relative
  });
}
debug('Create configuration.');
const config = {
  context: paths.ROOT_DIR,
  devtool: 'cheap-module-eval-source-map',
  target: 'web', // Make web variables accessible to webpack, e.g. window
  entry: {
    app: [HOT_MW,
      appCfg.BLDR_ENTRY
    ],
    vendors: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths.BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${WEBPACK_DEV_SERVER_PORT}/build/`
  },
  resolve: {
    alias: {},
    root: [paths.SRC_DIR],

    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: [paths.NODE_MODULES_DIR],
        include: [paths.SRC_DIR],
        query: babelLoaderConfiguration
      },
      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        include: [paths.SRC_DIR],
        exclude: /(node_modules|bower_components)/,
        loader: extendCSSLoaders([
          'css-loader?'
            + ['sourceMap', (__PROD__ ? '' : '-') + 'minimize', '-autoprefixer'].join('&'),
          'postcss-loader',
          'sass-loader?'
            + ['sourceMap', 'outputStyle=expanded'].join('&')
        ])
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      },
      {
      test: /\.json$/,
      loader: 'json-loader'
    }
    ]
  },
  postcss: wPack => ([
    require('postcss-import')({ addDependencyTo: wPack }),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]),

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.bundle.js' }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__,
      __DEBUG__
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};

// Optimizing rebundling
deps.forEach(dep => {
  const depPath = path.resolve(paths.NODE_MODULES_DIR, dep);

  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

export default config;
