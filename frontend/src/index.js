import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import PostsList from './components/posts_list';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={PostsList} />
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
