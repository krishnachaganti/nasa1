import { push } from 'react-router-redux';

export const DONE_LOADING = '@@sidebar/DONE_LOADING';
export const TOGGLE_SIDE_BAR = '@@sidebar/TOGGLE_SIDE_BAR';
export const CHANGE_SELECTED_DRAWER_ITEM = '@@sidebar/CHANGE_SELECTED_DRAWER_ITEM';

export const toggleSideBar = () => {
  return {
    type: TOGGLE_SIDE_BAR
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

export const routeToIndex = (index) => {
  return (dispatch) => {
    setTimeout(() => {
      let path = null;
      let title = null;
      switch (index) {
        case 1:
          path = '/';
          title = 'Employee Search';
          break;
        case 2:
          path = '/';
          title = 'Financial Report';
          break;
        case 3:
          path = '/';
          title = 'Task Order Actions';
          break;
        default:
          path = '/404';
      }

      if (path === null || path === '/404') {
        return dispatch(push(path));
      }

      dispatch(changeSelectedDrawerMenuListItem(index, title));
      dispatch(push(path));
      return;
    }, 500);
  };
};
