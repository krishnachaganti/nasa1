import Express from 'express';
import webpack from 'webpack';
import _debug from 'debug';

import webpackDevMiddleware from './webpack-dev';
import webpackHotMiddleware from './webpack-hot';
import appCfg from '../../src/config';
import webpackConfig from './wp.dev.config';

const debug = _debug('app:webpack:dev:server');
const app = new Express();
const compiler = webpack(webpackConfig);
const serverOptions = { publicPath: webpackConfig.output.publicPath };

// Use these middlewares to set up hot module reloading via webpack.
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(appCfg.WEBPACK_DEV_SERVER_PORT, () => {
  debug(`Webpack dev server listening on port ${appCfg.WEBPACK_DEV_SERVER_PORT}`);
});
