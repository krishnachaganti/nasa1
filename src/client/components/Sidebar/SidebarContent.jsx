
import React from 'react';
import TitlePanel from './TitlePanel';
const styles = {
  sidebar: {
    width: 256,
    height: '100%',
    overflow: 'hidden'
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none'
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575'
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white'
  }
};

const SidebarContent = props => {
  const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar;

  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>Mock menu item {ind}</a>);
  }

  return (
    <TitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <a href="as" style={styles.sidebarLink}>Home</a>
        <div style={styles.divider} />
        {links}
      </div>
    </TitlePanel>
  );
};

export default SidebarContent;
