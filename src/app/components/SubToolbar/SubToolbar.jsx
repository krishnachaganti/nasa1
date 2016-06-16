import React from 'react';

const bold = {
  fontWeight: '700'
};
const SubToolbar = props => {
  return (
    <div className="subtoolbar">
        <span style={ bold }>{ props.orgCode }</span> { props.orgTitle }
      </div>
  );
};

export default SubToolbar;

SubToolbar.propTypes = {
  orgCode: React.PropTypes.string
};
