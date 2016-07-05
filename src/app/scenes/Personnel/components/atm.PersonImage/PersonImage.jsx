import React, { PropTypes } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import IconButton from 'material-ui/IconButton';
import WBImg from './wendyburger.png';

const inlineStyles = {
  btnWrapper : {
    zIndex: '1100',
    position: 'absolute',
    paddingTop: '150px',
    paddingLeft: '25px',
    margin: '0 auto'
  },
  btnColor: {
    backgroundColor: '#fff',
    marginRight: '5px',
    borderRadius: '50%',
    zIndex: '1'
  },
  photo: {
    width: '169px',
    height: '225px'
  }
}
const PersonImage = props => {
  return (
    <div>
      <div style={ inlineStyles.btnWrapper } className="kudos">
       <IconButton tooltip="Give Kudos" style={ inlineStyles.btnColor } onClick={ props.increaseKudos }>
        <ThumbsUp />
       </IconButton>
      </div>
      <img style={ inlineStyles.photo } src={ props.photo ? props.photo : WBImg } />
    </div>
    );
};

export default PersonImage;

PersonImage.propTypes = {
  inlineStyles: PropTypes.object,
  increaseKudos: PropTypes.func
};
