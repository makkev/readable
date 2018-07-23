import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsList from './components/posts_list';
import PostsListCategory from './components/posts_list_category';
import PostsCreate from './components/posts_create';
import PostsEdit from './components/posts_edit';
import PostsDetail from './components/posts_detail';
import { createStore, applyMiddleware, compose  }  from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={PostsList} />
        <Route exact path="/:category" component={PostsListCategory} />
        <Route path="/post/create" component={PostsCreate} />
        <Route path="/edit/:id" component={PostsEdit} />
        <Route path="/detail/:id" component={PostsDetail} />

      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
