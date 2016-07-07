require('babel-core/register');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicToolsConfig = require('../../tools/webpack/isomorphic.config');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(isomorphicToolsConfig)
    .development(process.env.NODE_ENV === 'development')
    .server(process.cwd(), () => {
      require('./server');
    });
