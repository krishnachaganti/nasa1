import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Textblock = ({ children, center }) => {
  const textblockClass = classNames('textblock', center, {
    'textblock__center': center // eslint-disable-line
  });
  return (
    <section className={ textblockClass }>
      { children }
    </section>
  );
};

Textblock.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool
};

export default Textblock;
