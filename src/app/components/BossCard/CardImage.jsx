import React, { Component, PropTypes } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import IconButton from 'material-ui/IconButton';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import WBImg from './wendyburger.png';
import classes from './Card.scss';
const cardImageStyle = {

};
const btnWrapper = {
  zIndex: '1100',
  position: 'absolute',
  paddingTop: '150px',
  paddingLeft: '25px',
  margin: '0 auto'
};
const btnColor = {
  backgroundColor: '#fff',
  marginRight: '5px',
  borderRadius: '50%'
};

const CardImage = props => {
  return (
    <div style={ cardImageStyle }>
      <img src={ WBImg } className={ classes.cardImg } />
    </div>
    );
};

export default CardImage;
