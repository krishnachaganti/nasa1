import React, { Component, PropTypes } from 'react';
import nasalogo from './nasalogo.png';
import Heading from 'shared/atm.Heading';
const logoStyle = {
  width: '80px',
  height: '63px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center'
};
const headingStyle = {
  paddingTop: '100px'
};
const Header = (props) => {
  return (
    <div className="header__main" style={ props.heroImage }>
      <div className="container-fluid">
      <div className="row">
        <div className="col-xs">
          { props.menuIcon }
        </div>
        <div className="col-xs">
          <img src={ nasalogo } style={ logoStyle } />
        </div>
        <div className="col-xs">
          { props.weatherWidget }
        </div>
      </div>
      <div className="row">
        <div className="col-xs" style={ headingStyle }>

          { props.pageTitle }

        </div>
      </div>

      </div>
    </div>
  );
};

export default Header;
