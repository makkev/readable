import * as PostsAPI from '../utils/PostsAPI';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_ONE_POST = 'RECEIVE_ONE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const UPDATE_POST_VOTE_DETAIL = 'UPDATE_POST_VOTE_DETAIL';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // return s4() + s4() + s4() + s4() +  s4();
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});


export const fetchPost = () => dispatch => (
  PostsAPI
    .getAll()
    .then(post => dispatch(receivePost(post)))
);

export const receiveOnePost = post => ({
  type: RECEIVE_ONE_POST,
  post,
})
export const getPost = (id) => dispatch => (
  PostsAPI
    .getPost(id)
    .then(post => dispatch(receiveOnePost(post)))
);

export const createPost = post => ({
  type: CREATE_POST,
  post,
});

export const updatePost = post => ({
  type: UPDATE_POST,
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

export const editPost = (val) => {
  const { id, title, body, } = val;
  const post = {
    title,
    body,
  }
  return dispatch => (
    PostsAPI
      .editPost(id, post)
      .then(post => dispatch(updatePost(post)))
  );
}

export const updatePostVote = post => ({
  type: UPDATE_POST_VOTE,
  post,
});

export const postVote = (id, vote) => {
  return dispatch => (
    PostsAPI
      .postVote(id, vote)
      .then(post => dispatch(updatePostVote(post)))
  );
}

export const updatePostVoteDetail = post => ({
  type: UPDATE_POST_VOTE_DETAIL,
  post,
});

export const postVoteDetail = (id, vote) => {
  return dispatch => (
    PostsAPI
      .postVote(id, vote)
      .then(post => dispatch(updatePostVoteDetail(post)))
  );
}

export const deletePost = (post) => ({
  type: DELETE_POST,
  post,
});

export const removePost = (id) =>
  dispatch => 
    PostsAPI
      .deletePost(id)
      .then(post => dispatch(deletePost(post)));

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const listComments = (id) =>
  dispatch => 
    PostsAPI
      .listComments(id)
      .then(comments => dispatch(receiveComments(comments)));