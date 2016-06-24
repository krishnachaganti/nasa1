import axios from 'axios';

const FETCH_REPORTS = 'taskorder/@@report/FETCH_REPORTS';
const FETCH_REPORTS_SUCCESS = 'taskorder/@@report/FETCH_REPORTS_SUCCESS';
const FETCH_REPORTS_FAIL = 'taskorder/@@report/FETCH_REPORTS_FAIL';

const _fetchReports = () => ({
  type: FETCH_REPORTS
});

const fetchReportsSuccess = response => ({
  type: FETCH_REPORTS_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToFetchReports = data => ({
  type: FETCH_REPORTS_FAIL,
  data
});

// Public action creators
export function fetchReports(data) {
  return dispatch => {
    dispatch(_fetchReports());
    return axios.get('/api/v1/reports/files')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchReportsSuccess(response));
        } else {
          dispatch(failedToFetchReports('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToFetchReports(err));
      });
  };
}

const INITIAL_STATE = {
  loading: false,
  error: false,
  files: {}
};

export default function report(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REPORTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_REPORTS_SUCCESS:
      const newFile = {};
      action.payload.map(file => {
        !newFile[file.OrgCode] && (newFile[file.orgCode] = []);
        return newFile[file.orgCode].push(file);
      });
      return {
        ...state,
        error: false,
        loading: false,
        files: newFile
      };
    case FETCH_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
