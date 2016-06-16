import React, { PropTypes } from 'react';

class Heading extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
    color: PropTypes.string,
    align: PropTypes.string,
    top: PropTypes.string
  };

  render() {
    const tagName = 'h' + this.props.size;
    const className = 'heading heading--' + this.props.size;
    const style = {
      color: this.props.color,
      textAlign: this.props.align,
      paddingTop: this.props.top + 'px'
    };
    return React.createElement(tagName, { className, style }, this.props.children);
  }
}

export default Heading;
