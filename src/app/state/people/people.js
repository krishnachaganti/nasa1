import axios from 'axios';

export const LOAD_PEOPLE = '@@people/LOAD_PEOPLE';
export const LOAD_PEOPLE_SUCCESS = '@@people/LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_FAILURE = '@@people/LOAD_PEOPLE_FAILURE';

export const SET_FILTER = '@@people/SET_FILTER';
export const SET_FILTER_SUCCESS = '@@people/SET_FILTER_SUCCESS';
export const SET_FILTER_FAIL = '@@people/SET_FILTER_FAIL';

const loadPerson = () => ({
  type: LOAD_PEOPLE
});

const loadPeopleSuccess = response => ({
  type: LOAD_PEOPLE_SUCCESS,
  payload: response.data
});

// Fail receivers
const failedToLoadPeople = data => ({
  type: LOAD_PEOPLE_FAILURE,
  data
});

// Public action creators
export function getPeople(data) {
  return dispatch => {
    dispatch(loadPerson());
    return axios.get('/api/v1/people')
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

export const setFilter = (value) => ({
  type: SET_FILTER,
  filter: value
});

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  people: {},
  count: 0,
  filter: ''
};

export default function peopleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PEOPLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_SUCCESS:
      const newPeople = {};
      action.payload.map(person => {
        !newPeople[person.OrgCode] && (newPeople[person.OrgCode] = []);
        return newPeople[person.OrgCode].push(person);
      });
      return {
        ...state,
        error: false,
        loading: false,
        people: newPeople,
        count: action.payload.length
      };
    //
    case LOAD_PEOPLE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}
