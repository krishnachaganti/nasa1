import React from 'react';
// import classes from './Sider.scss';

const Sider = props => {
  return (
    <div className={ classes.Sider }>
    <ul>
      <li>
        <a href=""><span className={ classes.SiderSquare }>IT-A</span></a>
      </li>
      <li>
        <a href=""><span className={ classes.SiderSquare }>IT-B</span></a>
      </li>
      <li>
        <a href=""><span className={ classes.SiderSquare }>IT-C</span></a>
      </li>
    </ul>
      </div>
  );
};

export default Sider;

Sider.propTypes = {

};