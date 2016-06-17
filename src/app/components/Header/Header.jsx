import React, { Component, PropTypes } from 'react';
import nasalogo from './nasalogo.png';

const logoStyle = {
  width: '80px',
  height: '63px',
  margin: '0 auto',
  position: 'absolute',
  left: '43%',
  top: '15px',
  justifyContent: 'center'
};

const Header = (props) => {
  return (
      <div className="header__main">
      <img src={ nasalogo } style={ logoStyle } />

      { props.children }
      </div>
  );
};

export default Header;
