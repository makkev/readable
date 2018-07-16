import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import PostsList from './components/posts_list';
import { createStore }  from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// console.log(store.getState());

ReactDOM.render(
  // <BrowserRouter store={store} >
  //   <div>
  //     <Route path="/" component={PostsList} />
  //   </div>
  // </BrowserRouter>
  <PostsList store={store} />
  , document.getElementById('root'));
