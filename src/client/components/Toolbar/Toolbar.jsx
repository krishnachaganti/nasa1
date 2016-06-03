import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {

  render() {
    const inlineStyles = {
      width: '100%',
      height: '90px',
      backgroundColor: '#11222D'
    };
    return (
      <div>
        <div style={ inlineStyles }>
          Toolbar
          </div>
        </div>
    );
  }
}
export default Toolbar;
