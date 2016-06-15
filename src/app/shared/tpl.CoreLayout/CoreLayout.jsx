import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bem-grid';

export const CoreLayout = ({ children }) => (
  <div>
    <Helmet
      title="Splat"
      titleTemplate="Splat - %s"
      meta={[
        { 'char-set': 'utf-8' },
        { name: 'description', content: 'Splat' }
      ]}
    />
    <Grid>
      { children }
    </Grid>
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default CoreLayout;
