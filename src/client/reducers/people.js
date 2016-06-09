import * as constants from '../actions/people';

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  reports: '',
  people: [],
  person: {}
};

export default function people(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_PEOPLE:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_PEOPLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        people: action.payload
      };
    case constants.LOAD_PEOPLE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
