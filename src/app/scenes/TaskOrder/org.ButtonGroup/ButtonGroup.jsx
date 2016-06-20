import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const labelSty = {
  color: '#fff',
  textTransform: 'initial'
};

const ButtonGroup = (props) => {
  return (
    <div className="buttongroup">
      <FlatButton label="IT-A" labelStyle={ labelSty } />
      <FlatButton label="IT-B" labelStyle={ labelSty } />
      <FlatButton label="IT-C" labelStyle={ labelSty } />
      <FlatButton label="IT-D" labelStyle={ labelSty } />
      <FlatButton label="IT-E" labelStyle={ labelSty } />
      <FlatButton label="IT-F" labelStyle={ labelSty } />
    </div>
  );
};

ButtonGroup.propTypes = {

};

export default ButtonGroup;
