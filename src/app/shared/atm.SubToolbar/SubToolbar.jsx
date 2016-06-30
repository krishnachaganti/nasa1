import React from 'react';

const inlineStyles = {
  inline: {
    float: 'right',
    paddingRight: '25px'
  },
  bold: {
    fontWeight: '700'
  }
};

const SubToolbar = props => {
  return (
    <div className="subtoolbar">
      <span style={ inlineStyles.bold }>{ props.orgCode }</span> { props.env.width > 500 ? props.orgTitle : null }
      { props.orgLength ? <span style={ inlineStyles.inline }>Headcount: { props.orgLength }</span> : null }
    </div>
  );
};

export default SubToolbar;

SubToolbar.propTypes = {
  orgCode: React.PropTypes.string
};
