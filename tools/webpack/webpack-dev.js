import { argv } from 'yargs';
import webpackDevMiddleware from 'webpack-dev-middleware';

const QUIET_MODE = !!argv.quiet;

export default function(compiler, options) {
  const webpackDevMiddlewareOptions = {
    ...options,
    quiet: QUIET_MODE,
    noInfo: true,
    stats: {
      colors: true
    },
    hot: true,
    lazy: false,
    inline: false,
    historyApiFallback: true,
    // proxy: {
    //   '*': 'http://' + proxy.hostname + ':' + proxy.port
    // },
    contentBase: 'http://localhost:3001',
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  return webpackDevMiddleware(compiler, webpackDevMiddlewareOptions);
}
