import React, { Component, PropTypes } from 'react';

class Card extends Component {

  render() {
    const inlineStyles = {
      width: '375px',
      height: '200px',
      backgroundColor: '#FEFFFF'
    };
    return (
      <div>
        <div className="card__wrap">
          Card
          </div>
        </div>
    );
  }
}
export default Card;
