import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';

import methodOverride from 'method-override';
import morgan from 'morgan';

export default app => {
  const env = app.get('env');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());

  if (env === 'development' || env === 'test') {
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
