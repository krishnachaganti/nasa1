// Register the Babel require hook
require('babel-register')({
  ignore(filename) {
    return filename.indexOf('lodash-es') === -1 && filename.indexOf('node_modules') !== -1;
  }
});

// Export the application
module.exports = require('./app');
