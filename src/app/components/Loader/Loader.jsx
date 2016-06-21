import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
const loaderStyle = {
  margin: '0 auto',
  position: 'absolute',
  left: '48%',
  top: '62%'
}
const Loader = () => {
    return (
      <div>
        <CircularProgress style={ loaderStyle } size={ 2 } />
      </div>
    );
}

export default Loader;
