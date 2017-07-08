import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './App';

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  ),
)

render(
      <Provider store={store}>
        <App history={history} />
      </Provider>,
      document.getElementById('root'));
