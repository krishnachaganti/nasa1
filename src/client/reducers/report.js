import * as constants from '../actions/report';

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  reports: '',
  personnel: []
};

export default function report(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_REPORT:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_REPORT_SUCCESS:
      return {
        ...state,
        reports: action.payload,
        error: false,
        loading: false
      };
    case constants.LOAD_REPORT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
