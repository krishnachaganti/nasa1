import * as constants from '../actions/sidebar';

const INITIAL_STATE = {
  loading: true,
  isSideBarOpen: false,
  selectedDrawerMenuListItem: 1,
  error: false
};

export default function sidebar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.DONE_LOADING:
      return {
        ...state,
        loading: false
      };
    case constants.TOGGLE_SIDE_BAR:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen
      };
    case constants.CHANGE_SELECTED_DRAWER_ITEM:
      return {
        ...state,
        selectedDrawerMenuListItem: action.index, title: action.title
      };

    default:
      return state;
  }
}
