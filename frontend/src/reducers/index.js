import { combineReducers } from 'redux';
import { 
  RECEIVE_POST,
  RECEIVE_ONE_POST, } from '../actions';

const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return arrayToObject(action.post, 'id');
    case RECEIVE_ONE_POST:
      return action.post;

    

    default:
      return state;
  }
}

export default combineReducers({
 post, 
});