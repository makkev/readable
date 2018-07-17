import { combineReducers } from 'redux';
import { RECEIVE_POSTS } from '../actions';

const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return arrayToObject(action.posts, 'id');

    default:
      return state;
  }
}

export default combineReducers({
 posts, 
});