import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose } from 'redux';
import authReducer from './Store/reducers/auth'
import thunk from 'redux-thunk';
//const composeEnhancers = process.env.NODE_ENV === 'development'?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(authReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
