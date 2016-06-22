import React from 'react';

const bold = {
  fontWeight: '700'
};
const inline = {
  float: 'right',
  paddingRight: '25px'
};
const SubToolbar = props => {
  return (
    <div className="subtoolbar">
      <span style={ bold }>{ props.orgCode }</span> { props.orgTitle }<span style={ inline }>Headcount: { props.orgLength }</span>
    </div>
  );
};

export default SubToolbar;

SubToolbar.propTypes = {
  orgCode: React.PropTypes.string
};
