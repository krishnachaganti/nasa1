import axios from 'axios';

export const LOAD_PEOPLE = '@@people/LOAD_PEOPLE';
export const LOAD_PEOPLE_SUCCESS = '@@people/LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_FAILURE = '@@people/LOAD_PEOPLE_FAILURE';
export const OPEN_CARD = '@@people/OPEN_CARD';
export const CLOSE_CARD = '@@people/CLOSE_CARD';
export const CLOSE_ALL_CARDS = '@@people/CLOSE_ALL_CARDS';
export const SET_CARD = 'SET_CARD';

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

export function loadOpenCards() {
  return { type: SET_CARD };
};

const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  people: {},
  // openCards: { 123, 234, 345, 456, 567 }
  openCards: new Set()
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
        newPeople[person.OrgCode].push(person);
      });
      return {
        ...state,
        error: false,
        loading: false,
        people: newPeople
      };
    case LOAD_PEOPLE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SET_CARD:
      return Object.assign({}, state, {openCards: new Set([1])});
    case OPEN_CARD:
      return {
        ...state,
        openCards: new Set(state.openCards.add(action.personID))
      };
    case CLOSE_CARD:
      const newSet = new Set(state.openCards);
      newSet.delete(action.personID);
      return {
        ...state,
        openCards: newSet
      };
    case CLOSE_ALL_CARDS:
      return {
        ...state,
        openCards: new Set()
      };
    default:
      return state;
  }
}
