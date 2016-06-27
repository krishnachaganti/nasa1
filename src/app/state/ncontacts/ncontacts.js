import axios from 'axios';

export const LOAD_NCONTACT = '@@ncontact/LOAD_NCONTACT';
export const LOAD_NCONTACT_SUCCESS = '@@ncontact/LOAD_NCONTACT_SUCCESS';
export const LOAD_NCONTACT_FAILURE = '@@ncontact/LOAD_NCONTACT_FAILURE';

const loadNcontact = () => ({
  type: LOAD_NCONTACT
});

const loadNcontactSuccess = response => ({
  type: LOAD_NCONTACT_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadNcontact = data => ({
  type: LOAD_NCONTACT_FAILURE,
  data
});

// Public action creators
export function getNcontact(data) {
  return dispatch => {
    dispatch(loadNcontact());
    return axios.get('/api/v1/ncontacts')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadNcontactSuccess(response));
        } else {
          dispatch(failedToLoadNcontact('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadNcontact(err));
      });
  };
}

export const FETCH_SURVEY = '@@ncontact/FETCH_SURVEY';
export const FETCH_SURVEY_SUCCESS = '@@ncontact/FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_FAIL = '@@ncontact/FETCH_SURVEY_FAIL';

const loadContactSurvey = () => ({
  type: FETCH_SURVEY
});

const loadContactSurveySuccess = response => ({
  type: FETCH_SURVEY_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadContactSurvey = data => ({
  type: FETCH_SURVEY_FAIL,
  data
});

// Public action creators
export function getNasaContactData(contactName) {
  return dispatch => {
    dispatch(loadContactSurvey());
    return axios.get(`/api/v1/surveys/${contactName}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(loadContactSurveySuccess(response));
        } else {
          dispatch(failedToLoadContactSurvey('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadNcontact(err));
      });
  };
}

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  contacts:[],
  contact: {}
};

export default function nasaContacts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_NCONTACT:
      return {
        ...state,
        loading: true
      };
    case LOAD_NCONTACT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        contacts: action.payload
      };
    //
    case LOAD_NCONTACT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_SURVEY:
      return {
        ...state,
        loading: true
      };
    case FETCH_SURVEY_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        contact: action.payload
      };
    //
    case FETCH_SURVEY_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
