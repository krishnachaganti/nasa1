import * as constants from '../actions/people';

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  reports: '',
  people: [{
    DoH: '',
    ITS_016_001: '',
    LARC_CICT: '',
    NASAContactName: '',
    NASAContactPhone: '',
    OCIMPR: '',
    OrgCode: '',
    PersonnelName: '',
    PositionTitlePLC: '',
    TO_Name: '',
    TO_Number: '',
    TO_TechnicalMonitor: ''
  }]
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
