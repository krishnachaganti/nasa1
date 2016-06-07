import React, { Component, PropTypes } from 'react';
import classes from './Card.scss';

const Card = props => {
  return (
        <div className={ classes.cardWrap }>

            { props.cardImage }
            { props.cardContent }

        </div>
    );
};
export default Card;

Card.propTypes = {
  children: PropTypes.any,
  cardContent: PropTypes.object,
  cardImage: PropTypes.object
};
