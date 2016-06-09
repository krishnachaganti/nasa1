import * as constants from '../actions/header';

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  iotd: '',
  title: '',
  weather: {
    temperature: ''
  }
};

export default function header(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_IOTD:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_IOTD_SUCCESS:
      return {
        ...state,
        iotd: action.payload.hdurl,
        title: action.payload.title,
        loading: false
      };
    case constants.LOAD_IOTD_FAILURE:
      return {
        ...state
      };
    case constants.LOAD_WEATHER:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        weather: action.payload,
        temperature: Math.round(((action.payload.main.temp - 273.15) * 1.8000) + 32.0)
      };
    case constants.LOAD_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
