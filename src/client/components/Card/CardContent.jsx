import React, { Component, PropTypes } from 'react';
import classes from './Card.scss';

const CardContent = props => {
  return (
    <div className={ classes.cardContent }>
      <ul>
        <li><h4 className={ classes.cardName }>{ props.personName }</h4></li>
        <li>{ props.jobTitle }</li>
        <li>Org Code: { props.orgCode }</li>
        <li>Kudos: { props.kudos }</li>
      </ul>
    </div>
    );
};
export default CardContent;

CardContent.propTypes = {
  personName: PropTypes.string,
  jobTitle: PropTypes.string,
  orgCode: PropTypes.string,
  kudos: PropTypes.number
};
