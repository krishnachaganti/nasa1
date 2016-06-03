import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render() {
    const inlineStyles = {
      height: '465px',
      width: '100%',
      backgroundColor: '#132ffE'
    };
    return (
      <div className="header-hero" style={ inlineStyles }> {this.props.title}
        Header
      </div>
    );
  }
}

export default Header;
