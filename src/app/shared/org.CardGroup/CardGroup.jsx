import React, { PropTypes } from 'react';

const cardGroupStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0
};

const CardGroup = ({ children }) => {
  return (
    <ul style={ cardGroupStyle }>
      { children }
    </ul>
    );
};

export default CardGroup;
