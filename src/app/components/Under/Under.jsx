import React, { Component, PropTypes } from 'react';

const cardImageStyle = {

};
const underStyle = {

  display: 'block',
  width: '100%',
  height: '768px',
  backgroundColor: '#fff'
};

const Under = props => {
  return (
    <div style={ underStyle }>
      <div className="row">
        <div className="col-xs">
          <strong>Position Title</strong><br />
          { props.posTitle }<br />
          <strong>Org Code</strong> <br />
          { props.oCode }<br />
          <strong>Task Order Technical Monitor</strong> <br />
          { props.totm }<br />
        </div>
        <div className="col-xs">
          Date of Hire <br />
          { props.DoH }<br />
          Task Order #<br />
          { props.tonum }<br />
          NASA Contact<br />
          { props.nasaname }<br />
        </div>
          Task Order Name<br />
          { props.toname }<br />
          NASA Contact Phone # <br />
          { props.nasaphone }
      </div>
    </div>
    );
};

export default Under;
