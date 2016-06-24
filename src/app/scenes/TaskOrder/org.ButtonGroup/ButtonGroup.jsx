import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const labelSty = {
  color: '#fff',
  textTransform: 'initial'
};

const ButtonGroup = (props) => {
  return (
    <div className="buttongroup">
      <FlatButton label="IT-A" value="IT-A" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-B" value="IT-B" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-C" value="IT-C" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-D" value="IT-D" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-E" value="IT-E" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-F" value="IT-F" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
      <FlatButton label="IT-G" value="IT-G" onTouchTap={ props.filterAct } labelStyle={ labelSty } />
    </div>
  );
};

ButtonGroup.propTypes = {

};

export default ButtonGroup;
