import { push } from 'react-router-redux';
const TOGGLE_BOSS_CARD = 'personnel/@@card/TOGGLE_BOSS_CARD';
const TOGGLE_BOSS_CARD_SUCCESS = 'personnel/@@card/TOGGLE_BOSS_CARD_SUCCESS';
const TOGGLE_CARD = 'personnel/@@card/TOGGLE_CARD';
const TOGGLE_CARD_SUCCESS = 'personnel/@@card/TOGGLE_CARD_SUCCESS';

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

export const toggleBossCardFn = () => {
  return {
    type: TOGGLE_BOSS_CARD
  };
};

const toggleBossCardSuccess = (ncontact) => {
  return {
    type: TOGGLE_BOSS_CARD_SUCCESS,
    contactID: ncontact
  };
};

export const toggleBossCard = (ncontact) => {
  return dispatch => {
    dispatch(toggleBossCardFn())

    return dispatch(toggleBossCardSuccess(ncontact))
  }
}
const INITIAL_STATE = {
  loading: false,
  isCardOpen: false,
  error: false,
  personID: '',
  contactID: '',
  isBossCardOpen: false
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
    case TOGGLE_BOSS_CARD:
      return {
        ...state
      };
    case TOGGLE_BOSS_CARD_SUCCESS:
      return {
        ...state,
        isBossCardOpen: state.contactID === action.contactID ? !state.isBossCardOpen : true,
        contactID: action.contactID
      };
    default:
      return state;
  }
}
