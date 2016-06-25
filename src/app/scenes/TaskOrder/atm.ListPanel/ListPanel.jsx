import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import Heading from 'shared/atm.Heading';

const dateCirStyle = {
  backgroundColor: '#043A92',
  borderRadius: '50%',
  color: '#fff',
  width: '70px',
  height: '70px',
  textAlign: 'center',
  alignItems: 'center',
  paddingTop: '1.1em',
  lineHeight: '14px'
};
const ListPanel = (props) => {
  return (
    <div className="listgroup__panel">
      <div className="col-md-2">
        <div style={ dateCirStyle }>
        { props.monthAbrv }<br />
        { props.year }
        </div>
      </div>
      <div className="col-md-3">
      <strong>Period Covered</strong> <br />
      { props.file.periodStart } - { props.file.periodEnd }
      </div>
      <div className="col-md-5">
        <strong>Name of Preparer</strong> <br />
        { props.file.preparer }
      </div>
      <div className="col-md-2">
        <a href={ props.file.location }>View Full Report</a>
      </div>
    </div>
  );
};

ListPanel.propTypes = {

};

export default ListPanel;
