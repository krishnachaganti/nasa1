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
const linkStyle = {
  color: '#053A93',
  textDecoration: 'none',
  fontFamily: 'Titillium Web',
  fontSize: '20px'
}
const infoStyle = {
   color: '#053A93',
   fontFamily: 'Titillium Web'
}
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
      <span style={ infoStyle }>{ props.file.periodStart }</span>
      </div>
      <div className="col-md-5">
        <strong>Name of Preparer</strong> <br />
        <span style={ infoStyle }>{ props.file.preparer }</span>
      </div>
      <div className="col-md-2">
        <a href={ props.file.location } style={ linkStyle }>View Full Report</a>
      </div>
    </div>
  );
};

export default ListPanel;
