import { combineReducers } from 'redux';
import { 
  RECEIVE_POST,
  RECEIVE_ONE_POST,
  UPDATE_POST_VOTE, 
  UPDATE_POST_VOTE_DETAIL, 
  DELETE_POST,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  } from '../actions';

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
    case UPDATE_POST_VOTE_DETAIL:
      return { ...action.post };
    case DELETE_POST:
      return objectMinusRecDeleted(state, action.post.id);

 
    default:
      return state;
  }
}

function comment(state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return arrayToObject(action.comments, 'id');
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    case DELETE_COMMENT:
      return objectMinusRecDeleted(state, action.comment.id);
    case UPDATE_COMMENT:
      console.log(action.comment);
      return {
        ...state,
        [action.comment.id]: action.comment,
      };

    default:
      return state;
  }

}

export default combineReducers({
 post, 
 comment,
});