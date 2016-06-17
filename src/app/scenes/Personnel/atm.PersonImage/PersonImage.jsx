import React, { PropTypes } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import IconButton from 'material-ui/IconButton';
import WBImg from './wendyburger.png';

const btnWrapper = {
  zIndex: '1100',
  position: 'absolute',
  paddingTop: '150px',
  paddingLeft: '25px',
  margin: '0 auto'
};
const btnColor = {
  backgroundColor: '#fff',
  marginRight: '5px',
  borderRadius: '50%'
};

const PersonImage = props => {
  return (
    <div style={ cardImageStyle }>
      <div style={ btnWrapper } className="kudos">
       <IconButton tooltip="Give Kudos" style={ btnColor } onClick={ props.increaseKudos }>
        <ThumbsUp />
       </IconButton>
      </div>
      <img src={ WBImg } />
    </div>
    );
};

export default PersonImage;

PersonImage.propTypes = {

};
