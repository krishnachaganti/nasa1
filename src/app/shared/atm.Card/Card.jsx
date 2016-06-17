import React, { PropTypes } from 'react';

const cardItemStyle = {
  display: 'flex',
  padding: '1rem'
}
const cardStyle = {
  flexDirection: 'column',
  display: 'flex',
  overflow: 'hidden',
  backgroundColor: '#fff',
  width: '380px',
  height: '220px'
}
const Card = ({ children }) => {
  return (
    <li style={ cardItemStyle }>
      <div style={ cardStyle }>
        { children }
      </div>
    </li>
    );
};

export default Card;
