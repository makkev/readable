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
    // .then(data => data.posts)


export const addPost = (post) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
}).then(res => res.json())
