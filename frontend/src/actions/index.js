export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export function addPost ({ author, body, category, commentCount, title }) {
  return {
    type: ADD_POST,
    author,
    body,
    category,
    commentCount,
    title,
  }
}

export function deletePost ({ post }) {
  return {
    type: DELETE_POST,
    post,
  }
}