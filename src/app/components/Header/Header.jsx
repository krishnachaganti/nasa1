import React, { Component, PropTypes } from 'react';
import nasalogo from './nasalogo.png';

const logoStyle = {
  width: '80px',
  height: '63px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center'
};

const Header = (props) => {
  return (
    <div className="header__main">
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
        <div className="col-xs">
          { props.pageTitle }
        </div>
      </div>
        <div className="row center-xs">
         <div className="col-xs-6">
          { props.buttonGroup }
          </div>
        </div>
    </div>
  );
};

export default Header;
