import React, { Component, PropTypes } from 'react';
import WBImg from './wendyburger.png';
import classes from './Card.scss';
const CardImage = () => {
  return (<img src={ WBImg } className={ classes.cardImg } />
    );
};
export default CardImage;
