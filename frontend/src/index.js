import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import PostsList from './components/posts_list';
import { createStore, applyMiddleware, compose  }  from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

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
        <Route path="/" component={PostsList} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
