import React from 'react';
import classes from './SubToolbar.scss';
const bold = {
  fontWeight: '700'
};
const SubToolbar = props => {
  return (
    <div className={ classes.SubToolbar }>
        <span style={ bold }>{ props.orgCode }</span> { props.orgTitle }
      </div>
  );
};

export default SubToolbar;

SubToolbar.propTypes = {
  orgCode: React.PropTypes.string
};
