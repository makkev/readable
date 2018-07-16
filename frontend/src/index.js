import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import PostsList from './components/posts_list';
import { createStore }  from 'redux';
import reducer from './reducers';

const store = createStore(reducer);
console.log(store.getState());

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={PostsList} />
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
