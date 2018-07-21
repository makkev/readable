// const api = "https://reactnd-books-api.udacity.com"
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever'
}

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json());


export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const postVote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json());

export const deletePost = (id) => {
  let result = fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
  return result;

}

export const listComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());