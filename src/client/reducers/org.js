import * as constants from '../actions/org';

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  ita: [],
  itb: [],
  itc: [],
  itd: [],
  ite: []
};

export default function org(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_ITA:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_ITA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        ita: action.payload
      };
    case constants.LOAD_ITA_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case constants.LOAD_ITB:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_ITB_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itb: action.payload
      };
    case constants.LOAD_ITB_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case constants.LOAD_ITC:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_ITC_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itc: action.payload
      };
    case constants.LOAD_ITC_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case constants.LOAD_ITD:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_ITD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itd: action.payload
      };
    case constants.LOAD_ITD_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
