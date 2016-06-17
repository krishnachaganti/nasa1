import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const ListGroup = ({ children }) => {
  return (
    <section className="listgroup">
      { children }
    </section>
  );
};

ListGroup.propTypes = {
  children: PropTypes.node.isRequired
};

export default ListGroup;
