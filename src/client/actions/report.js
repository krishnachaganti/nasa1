import axios from 'axios';

export const LOAD_REPORT = '@@report/LOAD_REPORT';
export const LOAD_REPORT_SUCCESS = '@@report/LOAD_REPORT_SUCCESS';
export const LOAD_REPORT_FAILURE = '@@report/LOAD_REPORT_FAILURE';


const loadReports = () => ({
  type: LOAD_REPORT
});

const loadReportsSuccess = (response) => ({
  type: LOAD_REPORT_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadReports = (data) => ({
  type: LOAD_REPORT_FAILURE,
  loading: false,
  data
});

// Public action creators
export function getReports(data) {
  return dispatch => {
    dispatch(loadReports());
    return axios.get('/api/v1/reports')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadReportsSuccess(response));
        } else {
          dispatch(failedToLoadReports('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadReports(err));
      });
  };
}
