require('dotenv').config({ silent: true });
import { install } from 'source-map-support';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import isomorphicToolsConfig from '../../tools/webpack/isomorphic.config';
import appConfig from 'config/index';
import paths from 'config/paths';
install();
const projectBasePath = paths.ROOT_DIR;

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = appConfig.__DEV__;
global.__PROD__ = appConfig.__PROD__;
global.__DEBUG__ = appConfig.__DEBUG__;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools#mainjs
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(isomorphicToolsConfig)
    .development(__DEV__)
    .server(projectBasePath, () => {
      require('./server');
    });
