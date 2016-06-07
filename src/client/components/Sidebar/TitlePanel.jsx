import React from 'react';

const styles = {
  root: {
    fontWeight: 300
  },
  header: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em'
  }
};

const TitlePanel = props => {
  const rootStyle = props.style ? { ...styles.root, ...props.style } : styles.root;

  return (
    <div style={ rootStyle }>
      <div style={ styles.header }>{ props.title }</div>
      { props.children }
    </div>
  );
};

export default TitlePanel;

TitlePanel.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.string,
  children: React.PropTypes.element
};
