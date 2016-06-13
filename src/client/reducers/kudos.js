import * as constants from '../actions/kudos';

export default function kudos(state = {
  count: 0
}, action) {
  switch (action.type) {
    case constants.KUDOS_INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case constants.KUDOS_DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      });
    default:
      return state;
  }
}
