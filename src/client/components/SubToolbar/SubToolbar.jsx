import React from 'react';
import classes from './SubToolbar.scss';

const SubToolbar = props => {
  return (
    <div className={ classes.SubToolbar }>
      { props.orgCode }
      </div>
  );
};

export default SubToolbar;

SubToolbar.propTypes = {
  orgCode: React.PropTypes.string
};
