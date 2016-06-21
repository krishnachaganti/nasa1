const CHANGE_IS_MOBILE = '@@environment/CHANGE_IS_MOBILE';
const CHANGE_WIDTH_AND_HEIGHT = '@@environment/CHANGE_WIDTH_AND_HEIGHT';

function changeIsMobile(isMobile) {
  return {
    type: CHANGE_IS_MOBILE,
    isMobile
  };
}

export function changeWidthAndHeight(height, width) {
  return {
    type: CHANGE_WIDTH_AND_HEIGHT,
    height,
    width
  };
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}

const INITIAL_STATE = {
  isMobile: false,
  height: null,
  width: null
};

export default function environment(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_IS_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      };
    case CHANGE_WIDTH_AND_HEIGHT:
      return {
        ...state,
        height: action.height,
        width: action.width,
      };
    default:
      return state;
  }
}
