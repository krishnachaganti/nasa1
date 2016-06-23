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
const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  contacts:[]
};
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
    default:
      return state;
  }
}
