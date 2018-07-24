import { combineReducers, bindActionCreators } from 'redux';
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
  UPDATE_COMMENT_VOTE,
  GET_CATEGORIES,
  SORT_POST,
  } from '../actions';

const DEFAULT_SORT = 'timestamp';


const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

const objectMinusRecDeleted = (object, key) => {
  const { [key]: deletedObject, ...otherObjects } = object;
  return otherObjects;
}

const compareValues = (key, order='desc') => {
  return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0; 
      }

      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

function categories(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, ...action.categories.categories };
 
    default:
      return state;

  }

}

function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      // return arrayToObject(action.post, 'id');
      const sorted = [ ...action.post].sort(compareValues(DEFAULT_SORT, 'desc')) ;
      const sortedObj = arrayToObject(sorted, 'id');
      return sortedObj;
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
    case SORT_POST:
      const PostArray = Object.values(state);
      const sortedPost = PostArray.slice().sort(compareValues(action.sortBy, 'desc')) ;
      const sortedPostObj = arrayToObject(sortedPost, 'id');
      return sortedPostObj;

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
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    case UPDATE_COMMENT_VOTE:
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
 categories,
});