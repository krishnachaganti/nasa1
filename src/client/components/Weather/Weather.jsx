import React from 'react';
import Moment from 'moment';
import classes from './Weather.scss';

const monthDay = Moment().format('MMMM D');
const tmpStyle = {
  fontSize: '2.3em',
  color: '#fff',
  float: 'right'
};
const labelTxtSmall = {
  fontSize: '.95em',
  color: '#fff',
  fontWeight: '300'
};
const labelTxtBig = {
  fontSize: '1.1em',
  color: '#fff',
  fontWeight: '700',
  textTransform: 'uppercase'
};
const weatherList = {
  listStyleType: 'none'
};
const Weather = props => {
  return (
    <div className={ classes.weatherWidget }>
    <ul style={weatherList}>
      <li><span style={labelTxtBig}> Kennedy Space Center </span><span style={labelTxtSmall}>{ monthDay }</span></li>
      <li><span style={ tmpStyle }>{ props.temperature } F</span></li>
      </ul>
    </div>
  );
};

export default Weather;

Weather.propTypes = {
  temperature: React.PropTypes.number
};
