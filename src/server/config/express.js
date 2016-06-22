import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import errorHandler from 'errorhandler';
import compression from 'compression';
import methodOverride from 'method-override';
import morgan from 'morgan';
import requestLogger from '../lib/logger/requestLogger';
import responseLogger from '../lib/logger/responseLogger';
const VIEWS_DIR = path.join(__dirname, '..', 'views');
export default app => {
  const env = app.get('env');
  app.use(compression());
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', VIEWS_DIR);
  app.use(requestLogger);
  app.use(responseLogger);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());
  app.all('/*', (req, res, next) => {
    // CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
    // If someone calls with method OPTIONS, let's display the allowed methods on our API
    if (req.method === 'OPTIONS') {
      res.status(200);
      res.write('Allow: GET,PUT,POST,DELETE,OPTIONS');
      res.end();
    } else {
      next();
    }
  });
  app.disable('x-powered-by');
  app.enable('trust proxy');
  if (env === 'development' || env === 'test') {
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
