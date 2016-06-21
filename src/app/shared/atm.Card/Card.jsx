import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
function mapStateToProps(state) {
  return {
    card: state.card
  };
}

@connect(mapStateToProps)
class Card extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldOpen() {
    return this.props.personID === this.props.card.personID
      && this.props.card.isCardOpen;
  }

  render() {
    const cardStyle = {
      height: this.shouldOpen() ? '755px' : '252px'
    };
    return (
      <ReactCSSTransitionGroup transitionName="card-expander" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <li className="card-wrapper" key={this.props.personID} style={ cardStyle }>
          <div className="card-wrapper-inner">
            { this.props.children }
          </div>
        </li>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Card;
