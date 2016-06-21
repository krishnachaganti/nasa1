import { push } from 'react-router-redux';

const DONE_LOADING = 'personnel/@@card/DONE_LOADING';
const TOGGLE_CARD = 'personnel/@@card/TOGGLE_CARD';

export const toggleCardFn = (persn) => {
  return {
    type: TOGGLE_CARD,
    personID: persn
  };
};
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
        ...state,
        isCardOpen: !state.isCardOpen,
        personID: action.payload
      };

    default:
      return state;
  }
}
