import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';

export default class HomeContainer extends React.Component {

  render() {
    return (
      <div>
      <Card />
      <Card />
      <Card />
      </div>
    );
  }
}
