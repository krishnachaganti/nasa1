import React, { Component } from 'react';
import Helmet from 'react-helmet';

class Error404 extends Component {

  render() {
    return (
      <div>
        <Helmet title="404 -- Not Found!" />
        Page was not found
      </div>
    );
  }
}

export default Error404;
