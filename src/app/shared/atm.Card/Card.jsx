import React, { PropTypes } from 'react';

const Card = ({ children }) => {
  return (
    <li className="card-wrapper">
      <div className="card-wrapper-inner">
        { children }
      </div>
    </li>
    );
};

export default Card;
