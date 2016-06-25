import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { BossIcon } from 'scenes/Personnel/components';

function mapStateToProps(state) {
  return {
    card: state.card
  };
}

@connect(mapStateToProps)
class BCardWrap extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldOpen() {
    return this.props.contactID === this.props.card.contactID
      && this.props.card.isBossCardOpen;
  }

  render() {
    const cardStyle = {
      height: this.shouldOpen() ? '855px' : '252px'
    };
    return (
      <ReactCSSTransitionGroup transitionName="card-expander" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <li className="card-wrapper" key={this.props.contactID} style={ cardStyle }>
          <div className="card-wrapper-inner">
            { this.props.children }
          </div>
        </li>
      </ReactCSSTransitionGroup>
    );
  }
}

export default BCardWrap;
