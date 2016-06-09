import axios from 'axios';

export const LOAD_PEOPLE = '@@report/LOAD_PEOPLE';
export const LOAD_PEOPLE_SUCCESS = '@@report/LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_FAILURE = '@@report/LOAD_PEOPLE_FAILURE';


const loadPerson = () => ({
  type: LOAD_PEOPLE
});

const loadPeopleSuccess = (response) => ({
  type: LOAD_PEOPLE_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadPeople = (data) => ({
  type: LOAD_PEOPLE_FAILURE,
  data
});

// Public action creators
export function getPeople(data) {
  return dispatch => {
    dispatch(loadPerson());
    return axios.get('/api/v1/reports/people')
      .then(response => {
        if (response.status === 200) {
          dispatch(loadPeopleSuccess(response));
        } else {
          dispatch(failedToLoadPeople('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadPeople(err));
      });
  };
}
