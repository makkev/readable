import {
  ADD_POST,
  DELETE_POST,
} from '../actions';
import * as PostsAPI from '../utils/PostsAPI';

// let initialPostState = PostsAPI.getAll().then((posts) => {
//   return posts;
// });

const initialPostState = {
  author: 'KM',
  body: 'this is the body',
  category: 'react',
  commentCount: '5',
  title: 'The TITLE',
};


function post (state = initialPostState, action) {
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

export default post;