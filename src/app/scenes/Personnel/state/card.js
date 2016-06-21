import { push } from 'react-router-redux';

const DONE_LOADING = 'personnel/@@card/DONE_LOADING';
const TOGGLE_CARD = 'personnel/@@card/TOGGLE_CARD';
const TOGGLE_CARD_SUCCESS = 'personnel/@@card/TOGGLE_CARD_SUCCESS';


export const finishLoading = status => {
  return {
    type: DONE_LOADING
  };
};

const changeSelectedDrawerMenuListItem = (index, title) => {
  return {
    type: CHANGE_SELECTED_DRAWER_ITEM,
    index,
    title
  };
};

export const toggleCardFn = () => {
  return {
    type: TOGGLE_CARD
  };
};

const toggleCardSuccess = (persn) => {
  return {
    type: TOGGLE_CARD_SUCCESS,
    personID: persn
  };
};

export const toggleCard = (persn) => {
  return dispatch => {
    dispatch(toggleCardFn())

    return dispatch(toggleCardSuccess(persn))
  }
}

const INITIAL_STATE = {
  loading: false,
  isCardOpen: false,
  error: false,
  personID: ''
};

export default function card(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_CARD:
      return {
        ...state
      };
    case TOGGLE_CARD_SUCCESS:
      return {
        ...state,
        isCardOpen: state.personID === action.personID ? !state.isCardOpen : true,
        personID: action.personID
      };
    default:
      return state;
  }
}
