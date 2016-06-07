import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import { white } from 'material-ui/styles/colors';
import PhotoCamera from 'material-ui/svg-icons/action/camera-enhance';

const cameraStyle = {
  position: 'absolute',
  top: '410px',
  right: '2.5rem'
};

export const Header = props => (
  <div className={ classes.headerHero } style={ props.headerImage }>
    <h2>{ props.title }</h2>
    { props.weatherWidget }
    <div className={ classes.headerTextWrap }>
      <h2 className={ classes.headerText }>Search our Listing of Current Employees and Training Status <br />
      Regarding Treatment of Sensitive Information</h2>
    </div>
     <PhotoCamera style={ cameraStyle } color={ white } />
  </div>
);

export default Header;

Header.propTypes = {
  title: React.PropTypes.object.isRequired,
  headerImage: React.PropTypes.object,
  weatherWidget: React.PropTypes.element
};
