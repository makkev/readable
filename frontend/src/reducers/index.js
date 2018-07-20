import { combineReducers } from 'redux';
import { 
  RECEIVE_POST,
  RECEIVE_ONE_POST,
  UPDATE_POST_VOTE, 
  DELETE_POST} from '../actions';

const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

const objectMinusRecDeleted = (object, key) => {
  const { [key]: deletedObject, ...otherObjects } = object;
  return otherObjects;
}

function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return arrayToObject(action.post, 'id');
    case RECEIVE_ONE_POST:
      return action.post;
    case UPDATE_POST_VOTE:
      return { 
        ...state,
        [action.post.id]: action.post, 
      };
    case DELETE_POST:
      return objectMinusRecDeleted(state, action.post.id);

    default:
      return state;
  }
}

export default combineReducers({
 post, 
});