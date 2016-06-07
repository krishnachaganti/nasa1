import React from 'react';
import classes from './Weather.scss';

const Weather = props => {
  return (
    <div className={ classes.weatherWidget }>
      <h1>WEATHER</h1>
      <h2>{ props.temperature }</h2>
    </div>
  );
};

export default Weather;

Weather.propTypes = {
  temperature: React.PropTypes.number
};
