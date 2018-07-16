import {
  ADD_POST,
  DELETE_POST,
} from '../actions';

function post (state, action) {
  const { author, body, category, commentCount, title } = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        action
      }

    default:
      return state;
  }
}