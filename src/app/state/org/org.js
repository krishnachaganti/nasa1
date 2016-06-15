import axios from 'axios';

export const LOAD_ITA = '@@org/LOAD_ITA';
export const LOAD_ITA_SUCCESS = '@@org/LOAD_ITA_SUCCESS';
export const LOAD_ITA_FAILURE = '@@org/LOAD_ITA_FAILURE';
const loadITA = () => ({
  type: LOAD_ITA
});

const loadITASuccess = response => ({
  type: LOAD_ITA_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadITA = data => ({
  type: LOAD_ITA_FAILURE,
  data
});

export function getITA(data) {
  return dispatch => {
    dispatch(loadITA());
    return axios.get('/api/v1/people/ita')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadITASuccess(response));
        } else {
          dispatch(failedToLoadITA('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadITA(err));
      });
  };
}

export const LOAD_ITB = '@@org/LOAD_ITB';
export const LOAD_ITB_SUCCESS = '@@org/LOAD_ITB_SUCCESS';
export const LOAD_ITB_FAILURE = '@@org/LOAD_ITB_FAILURE';
const loadITB = () => ({
  type: LOAD_ITB
});

const loadITBSuccess = response => ({
  type: LOAD_ITB_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadITB = data => ({
  type: LOAD_ITB_FAILURE,
  data
});

export function getITB(data) {
  return dispatch => {
    dispatch(loadITB());
    return axios.get('/api/v1/people/itb')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadITBSuccess(response));
        } else {
          dispatch(failedToLoadITB('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadITB(err));
      });
  };
}

export const LOAD_ITC = '@@org/LOAD_ITC';
export const LOAD_ITC_SUCCESS = '@@org/LOAD_ITC_SUCCESS';
export const LOAD_ITC_FAILURE = '@@org/LOAD_ITC_FAILURE';
const loadITC = () => ({
  type: LOAD_ITC
});

const loadITCSuccess = response => ({
  type: LOAD_ITC_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadITC = data => ({
  type: LOAD_ITC_FAILURE,
  data
});

export function getITC(data) {
  return dispatch => {
    dispatch(loadITC());
    return axios.get('/api/v1/people/itc')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadITCSuccess(response));
        } else {
          dispatch(failedToLoadITC('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadITC(err));
      });
  };
}

export const LOAD_ITD = '@@org/LOAD_ITD';
export const LOAD_ITD_SUCCESS = '@@org/LOAD_ITD_SUCCESS';
export const LOAD_ITD_FAILURE = '@@org/LOAD_ITD_FAILURE';
const loadITD = () => ({
  type: LOAD_ITD
});

const loadITDSuccess = response => ({
  type: LOAD_ITD_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadITD = data => ({
  type: LOAD_ITD_FAILURE,
  data
});

export function getITD(data) {
  return dispatch => {
    dispatch(loadITD());
    return axios.get('/api/v1/people/itd')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadITDSuccess(response));
        } else {
          dispatch(failedToLoadITD('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadITD(err));
      });
  };
}
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

export default function orgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ITA:
      return {
        ...state,
        loading: true
      };
    case LOAD_ITA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        ita: action.payload
      };
    case LOAD_ITA_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOAD_ITB:
      return {
        ...state,
        loading: true
      };
    case LOAD_ITB_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itb: action.payload
      };
    case LOAD_ITB_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOAD_ITC:
      return {
        ...state,
        loading: true
      };
    case LOAD_ITC_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itc: action.payload
      };
    case LOAD_ITC_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOAD_ITD:
      return {
        ...state,
        loading: true
      };
    case LOAD_ITD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        itd: action.payload
      };
    case LOAD_ITD_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
