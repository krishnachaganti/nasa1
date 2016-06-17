import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

const dateCirStyle = {
  backgroundColor: '#043A92',
  borderRadius: '50%',
  color: '#fff',
  width: '70px',
  height: '70px',
  textAlign: 'center',
  alignItems: 'center'
};
const ListPanel = (props) => {
  return (
    <div className="listgroup__panel">
      <div className="col-md-2">
        <div style={ dateCirStyle }>
        { props.dateCircle }
        </div>
      </div>
      <div className="col-md-3">
      Period Covered <br />
      { props.dateRange }
      </div>
      <div className="col-md-4">
        Name of Preparer <br />
        { props.preparer }
      </div>
      <div className="col-md-3">
        <Link to={ props.link }>View Full Report</Link>
      </div>
    </div>
  );
};

ListPanel.propTypes = {

};

export default ListPanel;
