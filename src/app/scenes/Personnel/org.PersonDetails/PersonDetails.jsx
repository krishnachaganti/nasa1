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
export default class PersonDetails extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldOpen() {
    return this.props.personID === this.props.card.personID
      && this.props.card.isCardOpen;
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

    const renderTable = (
      <section className="faux-table">
          <div className="row">
            <div className="col-md-3">
                <strong>Trainings</strong>
            </div>
            <div className="col-md-3">
                <strong>Date</strong>
            </div>
            <div className="col-md-6">
                <strong>Status </strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
                ITS_016_001
            </div>
            <div className="col-md-3">
               { this.props.person.ITS_016_001 }
            </div>
            <div className="col-md-6">
                { this.props.person.ITS_016_001 ? <span>Completed</span> : <span>Not Complete</span> }
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
                LARC_CICT
            </div>
            <div className="col-md-3">
                { this.props.person.LARC_CICT }
            </div>
            <div className="col-md-6">
               { this.props.person.LARC_CICT ? <span>Completed</span> : <span>Not Complete</span> }
            </div>
          </div>
           <div className="row">
            <div className="col-md-3">
               OCIMPR
            </div>
            <div className="col-md-3">
            { this.props.person.OCIMPR }
             </div>
            <div className="col-md-6">
               { this.props.person.OCIMPR ? <span>Completed</span> : <span>Not Complete</span> }
            </div>
          </div>
        </section>
    );
    return (
       <ReactCSSTransitionGroup transitionName="card-expander"
          transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 }>
         <div className="card-expander" key="expander" style={ expanderStyle }>
         <div className="person-details__wrap">
          <div className="row">
            <div className="col-md-3">
              <strong>Position Title</strong><br />
              { this.props.person.PositionTitlePLC }
            </div>
            <div className="col-md-3">
              <strong>Date of Hire</strong> <br />
              { this.props.person.DoH }
            </div>
            <div className="col-md-offset-3 col-md-3">
              <IconButton onClick={ this.props.closeExpand } tooltip="Dismiss">
                <CloseIcn />
              </IconButton>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
                <strong>Org Code</strong> <br />
                { this.props.person.OrgCode }
            </div>
            <div className="col-md-3">
                <strong>Task Order #</strong><br />
                { this.props.person.TO_Number }
            </div>
            <div className="col-md-6">
                    <strong>Task Order Name</strong><br />
                { this.props.person.TO_Name }
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
                <strong>Task Order Technical Monitor</strong> <br />
                { this.props.person.TO_TechnicalMonitor }<br />
            </div>
            <div className="col-md-3">
                <strong>NASA Contact</strong><br />
                { this.props.person.NASAContactName }
            </div>
            <div className="col-md-6">
                <strong>NASA Contact Phone # </strong><br />
                { this.props.person.NASAContactPhone }
            </div>
          </div>
          { renderTable }
           </div>
        </div>
       </ReactCSSTransitionGroup>
    );
  }

}

PersonDetails.propTypes = {
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number
};
