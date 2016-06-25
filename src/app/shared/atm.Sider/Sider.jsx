import React from 'react';

const Sider = props => {
  return (
    <div className="sider">
      <ul>
        <li>
          <a href=""><span className="sider__square">IT-A</span></a>
        </li>
        <li>
          <a href=""><span className="sider__square">IT-B</span></a>
        </li>
        <li>
          <a href=""><span className="sider__square">IT-C</span></a>
        </li>
        <li>
          <a href=""><span className="sider__square">IT-D</span></a>
        </li>
        <li>
          <a href=""><span className="sider__square">IT-E</span></a>
        </li>
         <li>
          <a href=""><span className="sider__square">IT-F</span></a>
        </li>
          <li>
          <a href=""><span className="sider__square">IT-G</span></a>
        </li>
      </ul>
    </div>
  );
};

export default Sider;

Sider.propTypes = {

};
