import axios from 'axios';

export const LOAD_IOTD = '@@header/LOAD_IOTD';
export const LOAD_IOTD_SUCCESS = '@@header/LOAD_IOTD_SUCCESS';
export const LOAD_IOTD_FAILURE = '@@header/LOAD_IOTD_FAILURE';
export const LOAD_WEATHER = '@@header/LOAD_WEATHER';
export const LOAD_WEATHER_SUCCESS = '@@header/LOAD_WEATHER_SUCCESS';
export const LOAD_WEATHER_FAILURE = '@@header/LOAD_WEATHER_FAILURE';

const loadIotd = () => ({
  type: LOAD_IOTD
});

const loadIotdSuccess = (response) => ({
  type: LOAD_IOTD_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadIotd = (data) => ({
  type: LOAD_IOTD_FAILURE,
  loading: false,
  data
});

const API_KEY = 'cbEIGV7rvRoodqjrXF51437E6x125Hh6r7ZtHFZY';
// Public action creators
export function getIotd(data) {
  return dispatch => {
    dispatch(loadIotd());
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(loadIotdSuccess(response));
        } else {
          dispatch(failedToLoadIotd('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadIotd(err));
      });
  };
}

const loadWeather = () => ({
  type: LOAD_WEATHER
});

const loadWeatherSuccess = (response) => ({
  type: LOAD_WEATHER_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadWeather = (data) => ({
  type: LOAD_WEATHER_FAILURE,
  loading: false,
  data
});

const WEATHER_API_KEY = '52f9ae939ba553ccc4981ddf1fcd002f';
// Public action creators
export function fetchWeather(data) {
  return dispatch => {
    dispatch(loadWeather());
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=32801,us&appid=${WEATHER_API_KEY}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(loadWeatherSuccess(response));
        } else {
          dispatch(failedToLoadWeather('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadWeather(err));
      });
  };
}
