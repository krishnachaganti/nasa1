import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import CloseIcn from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { getNasaContactData } from 'state/ncontacts/ncontacts';
function mapStateToProps(state) {
  return {
    card: state.card,
    nasaContacts: state.nasaContacts
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
      height: this.shouldOpen() ? '700px' : 0
    };
    const icnBtnStyle = {
      float: 'right'
    };
    const topRowStyle = {
      marginTop: '5px',
      backgroundColor: '#F0F0F0'
    };
    const midRowStyle = {
      backgroundColor: '#F0F0F0'
    };
    const botRowStyle = {
      backgroundColor:'#F0F0F0'
    };
    const span1Style = {
      verticalAlign: 'middle'
    };
    const span2Style = {
      float: 'right'
    };
    const renderTable = (
      <section className="faux-table">
          <div className="row">
            <div className="col-md-3">
                <strong>Contractor Team</strong>
            </div>
            <div className="col-md-3">
                <strong>Position Title</strong>
            </div>
            <div className="col-md-3">
                <strong>NASA Contact</strong>
            </div>
            <div className="col-md-3">
                <strong>Trainings</strong>
            </div>
          </div>
          {/* end header row */}
          <div className="row row__pad" style={ topRowStyle }>
            <div className="col-md-3">
                Wendy Mizerek-Herrburger
            </div>
            <div className="col-md-3">
              Project Manager 3
            </div>
            <div className="col-md-3">
            Lisa Barber
            </div>
            <div className="col-md-3">
            Completed.
            </div>
          </div>
          <div className="row row__pad" style={ midRowStyle }>
              <div className="col-md-3">
               John Leavitt
            </div>
            <div className="col-md-3">
            Project Manager 2
            </div>
            <div className="col-md-3">
            Lisa Barber
            </div>
            <div className="col-md-3">
            Incomplete
            </div>
          </div>
           <div className="row row__pad" style={ botRowStyle }>
              <div className="col-md-3">
                Arthur Waters
            </div>
            <div className="col-md-3">
            Project Manager 1
            </div>
            <div className="col-md-3">
            Buddy Reckline
            </div>
            <div className="col-md-3">
            Incomplete
            </div>
          </div>
        </section>
    );
    const renderBottomT = (
      <section className="faux-table">
          <div className="row">
            <div className="col-md-6">
                <strong>Authored Performance Survey</strong>
            </div>
            <div className="col-md-6">

            </div>
          </div>
          {/* end header row */}
          <div className="row row__pad" style={ topRowStyle }>
           <div className="col-md-6 col__border">
               <span style={ span1Style }></span> <span style={span2Style}>Download</span>
            </div>
            <div className="col-md-6">
              <span style={ span1Style }>07/01/15 - 09/30/15 (pdf)</span> <span style={span2Style}>Download</span>
            </div>
          </div>
          <div className="row row__pad" style={ midRowStyle }>
              <div className="col-md-6 col__border">
                <span style={ span1Style }>07/01/15 - 09/30/15 (pdf)</span> <span style={span2Style}>Download</span>
            </div>
            <div className="col-md-6">
               <span style={ span1Style }>07/01/15 - 09/30/15 (pdf)</span> <span style={span2Style}>Download</span>
            </div>
          </div>
        </section>
    );
    return (
       <ReactCSSTransitionGroup transitionName="card-expander"
          transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 }>
         <div className="card-expander" key="expander" style={ expanderStyle }>
         <div className="wrap">
          <div className="row row__padding">
            <div className="col-md-3">
              <strong>Position Title</strong><br />
              Task Order Technical Monitor
            </div>
            <div className="col-md-3">
              <strong>NASA Contact Phone #</strong> <br />
              321.867.1794
            </div>
            <div className="col-md-offset-3 col-md-3">
              <IconButton onClick={ this.props.closeExpand } tooltip="Dismiss" style={ icnBtnStyle }>
                <CloseIcn />
              </IconButton>
            </div>
          </div>
          <div className="row row__padding">
            <div className="col-md-3">
                <strong>Org Code</strong> <br />
                IT-A
            </div>
            <div className="col-md-3">
                <strong>Task Order #</strong><br />
                IT-A,E
            </div>
            <div className="col-md-6">
              <strong>Task Order Name</strong><br />
              IT Business Office and End User Support
            </div>
          </div>

          { renderTable }
          { renderBottomT }
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
