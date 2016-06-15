import React from 'react';
import classes from './Counter.scss';

export const Counter = props => (
  <div>
    <h2 className={classes.counterContainer}>
      Kudos:
      {' '}
      <span className={classes['counter--green']}>
        {props.count}
      </span>
    </h2>
    <button onClick={ props.handleIncrement }>
      +
    </button>
    {' '}
    <button onClick={ props.handleDecrement }>
    -
    </button>
  </div>
);

Counter.propTypes = {
  count: React.PropTypes.number.isRequired,
  handleDecrement: React.PropTypes.func.isRequired,
  handleIncrement: React.PropTypes.func.isRequired
};

export default Counter;
