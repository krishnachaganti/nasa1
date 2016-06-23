import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import CloseIcn from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

function mapStateToProps(state) {
  return {
    card: state.card
  };
}

@connect(mapStateToProps)
export default class BossDetails extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldOpen() {
    return this.props.contactID === this.props.card.contactID
      && this.props.card.isBossCardOpen;
  }

  render() {
    const listStyle = {
      listStyleType: 'none'
    };
    const listItemStyle = {
      display: 'inline-block'
    };
    const expanderStyle = {
      height: this.shouldOpen() ? '500px' : 0
    };
    const icnBtnStyle = {
      float: 'right'
    };


    return (
       <ReactCSSTransitionGroup transitionName="card-expander"
          transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 }>
         <div className="card-expander" key="expander" style={ expanderStyle }>
         <div className="wrap">
          sadfsfsfsfsf
           </div>
        </div>
       </ReactCSSTransitionGroup>
    );
  }

}

BossDetails.propTypes = {
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number
};
