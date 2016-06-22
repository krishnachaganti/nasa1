import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Trainings</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>ITS_016_001</TableRowColumn>
            <TableRowColumn>{ this.props.person.ITS_016_001 }</TableRowColumn>
            <TableRowColumn>Completed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>LARC_CICT</TableRowColumn>
            <TableRowColumn>{ this.props.person.LARC_CICT }</TableRowColumn>
            <TableRowColumn>Completed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>OCIMPR</TableRowColumn>
            <TableRowColumn>{ this.props.person.OCIMPR }</TableRowColumn>
            <TableRowColumn>Completed</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
    return (
       <ReactCSSTransitionGroup transitionName="card-expander" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
         <div className="card-expander" key="expander" style={ expanderStyle }>
          <div className="row">
            <ul style={ listStyle }>
              <li style={ listItemStyle }>
                <strong>Position Title</strong><br />
                { this.props.person.PositionTitlePLC }
              </li>
              <li style={ listItemStyle }>
                <strong>Date of Hire</strong> <br />
                { this.props.person.DoH }
              </li>
            </ul>
            <IconButton onClick={ this.props.closeExpand } tooltip="Dismiss">
            <CloseIcn />
            </IconButton>
          </div>
          <div className="row">
            <ul style={ listStyle }>
              <li style={ listItemStyle }>
                <strong>Org Code</strong> <br />
                { this.props.person.OrgCode }
              </li>
              <li style={ listItemStyle }>
                <strong>Task Order #</strong><br />
                { this.props.person.TO_Number }
              </li>
              <li style={ listItemStyle }>
                <strong>Task Order Name</strong><br />
                { this.props.person.TO_Name }
              </li>
            </ul>
          </div>
          <div className="row">
            <ul style={ listStyle }>
              <li style={ listItemStyle }>
                <strong>Task Order Technical Monitor</strong> <br />
                { this.props.person.TO_TechnicalMonitor }<br />
              </li>
              <li style={ listItemStyle }>
                <strong>NASA Contact</strong><br />
                { this.props.person.NASAContactName }<br />
              </li>
              <li style={ listItemStyle }>
                <strong>NASA Contact Phone # </strong><br />
                { this.props.person.NASAContactPhone }
              </li>
            </ul>
          </div>
          <div className="row">
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
