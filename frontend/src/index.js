import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsList from './components/posts_list';
import PostsListCategory from './components/posts_list_category';
import PostsCreate from './components/posts_create';
import PostsEdit from './components/posts_edit';
import PostsDetail from './components/posts_detail';
import Error404 from './components/error_page';
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
        <Switch>
          <Route exact path="/" component={PostsList} />
          <Route exact path="/:category" component={PostsListCategory} />
          <Route exact path="/post/create" component={PostsCreate} />
          <Route exact path="/edit/:id" component={PostsEdit} />
          <Route exact path="/:category/:id" component={PostsDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
