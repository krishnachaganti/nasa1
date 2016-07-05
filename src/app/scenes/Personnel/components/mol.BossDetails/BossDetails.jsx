import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import CloseIcn from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { getNasaContactData } from 'state/ncontacts/ncontacts';
import shallowCompare from 'react-addons-shallow-compare';
import CheckIcon from '../atm.CheckIcon';
import EmptyCircle from '../atm.EmptyCircle';
function mapStateToProps(state) {
  return {
    card: state.card,
    nasaContacts: state.nasaContacts
  };
}

@connect(mapStateToProps)
export default class BossDetails extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  shouldOpen() {
    return this.props.contactID === this.props.card.contactID
      && this.props.card.isBossCardOpen;
  }

  render() {
    const { surveys } = this.props;
    const listStyle = {
      listStyleType: 'none'
    };
    const listItemStyle = {
      display: 'inline-block'
    };
    const expanderStyle = {
      height: this.shouldOpen() ? '1000px' : 0
    };
    const icnBtnStyle = {
      float: 'right'
    };
    const iconstyle = {
      marginLeft: '10px'
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
      color: '#053A93',
      verticalAlign: 'middle'
    };
    const labeltext = {
      verticalAlign: 'top'
    };
    const span2Style = {
      float: 'right'
    };
    const linkstyle = {
      color: '#053A93',
      textDecoration: 'none'
    };
    const renderTable = (
      <section className="faux-table">
          <div className="row">
            <div className="col-xs-12 col-md-3">
                <strong>Contractor Team</strong>
            </div>
            <div className="col-xs-12 col-md-3">
                <strong>Position Title</strong>
            </div>
            <div className="col-xs-12 col-md-3">
                <strong>NASA Contact</strong>
            </div>
            <div className="col-xs-12 col-md-3">
                <strong>Trainings</strong>
            </div>
          </div>
          {/* end header row */}

            {
              this.props.contractors.length ? this.props.contractors.map((contractor, i) => {
                return (
                   <div className="row row__pad" style={ midRowStyle } key={ i }>
                     <div className="col-xs-12 col-md-3">
                        <span style={linkstyle}>{ contractor.PersonnelName }</span>
                     </div>
                     <div className="col-xs-12 col-md-3">
                      <span style={linkstyle}>{ contractor.PositionTitlePLC }</span>
                     </div>
                     <div className="col-xs-12 col-md-2">
                     <span style={linkstyle}>{ contractor.NASAContactName }</span>
                     </div>
                     <div className="col-xs-12 col-md-4">
                      { contractor.ITS_016_001 ? <span data-tip={ `Completed ${contractor.ITS_016_001}` }>
                       <span style={ iconstyle }><CheckIcon /> </span> <span style={labeltext}>ITS 016 001</span>
                      </span> : <EmptyCircle />
                      }
                      { contractor.LARC_CICT ? <span data-tip={ `Completed ${contractor.LARC_CICT}` }>
                        <span style={ iconstyle }><CheckIcon /> </span><span style={labeltext}>LARC CICT</span>
                      </span> : <EmptyCircle />
                      }
                      { contractor.OCIMPR ? <span data-tip={ `Completed ${contractor.OCIMPR}` }>
                        <span style={ iconstyle }><CheckIcon /> </span> <span style={labeltext}>OCIMPR</span>
                      </span> : <EmptyCircle />
                      }

                     <ReactTooltip />
                     </div>
                  </div>
                )
              }) : null
            }

        </section>
    );

    const renderBottomT = (
      <section className="faux-table">
          <div className="row">
            <div className="col-xs-12 col-md-6">
                <strong>Authored Performance Survey</strong>
            </div>

          </div>
          {/* end header row */}
          <div className="row row__pad" style={ topRowStyle }>
            {
              this.props.surveys.length ? this.props.surveys.map((survey, i) => {
                return (
                  <div className="col-xs-12 col-md-6 col__border" key={ i }>
                    <span style={ span1Style }>{ survey.periodStart } - { survey.periodEnd }</span>
                    <span style={ span2Style }><a style={ linkstyle } href={ survey.location }>Download</a></span>
                  </div>
                )
              }) : null
            }

          </div>

        </section>
    );
    return (
       <ReactCSSTransitionGroup transitionName="card-expander"
          transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 }>
         <div className="card-expander" key="expander" style={ expanderStyle }>
         <div className="wrap">
          <div className="row row__padding">
            <div className="col-xs-12 col-md-3">
              <strong>Position Title</strong><br />
              NASA Contact
            </div>
            <div className="col-xs-12 col-md-3">
              <strong>NASA Contact Phone #</strong> <br />
              { this.props.nasaPhone }
            </div>
            <div className="col-xs-12 col-md-offset-3 col-md-3">
              <IconButton onClick={ this.props.closeExpand } tooltip="Dismiss" style={ icnBtnStyle }>
                <CloseIcn />
              </IconButton>
            </div>
          </div>
          <div className="row row__padding">
            <div className="col-xs-12 col-md-3">
                <strong>Org Code</strong> <br />
                { this.props.orgCode }
            </div>
            <div className="col-xs-12 col-md-3">
                <strong>Task Order #</strong><br />
                { this.props.taskOrder }
            </div>
            <div className="col-xs-12 col-md-6">
              <strong>Task Order Name</strong><br />
              { this.props.orgTitle }
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
