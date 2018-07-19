import * as PostsAPI from '../utils/PostsAPI';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // return s4() + s4() + s4() + s4() +  s4();
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = () => dispatch => (
  PostsAPI
    .getAll()
    .then(posts => dispatch(receivePosts(posts)))
);

export const createPost = post => ({
  type: CREATE_POST,
  post,
});

export const addPost = (val) => {
  const { title, body, author, category } = val;
  const post = {
    id: guid(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
  }
  return dispatch => (
    PostsAPI
      .addPost(post)
      .then(post => dispatch(createPost(post)))
  );
}
