import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducer from '../store/reducers/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, composeEnhancers(applyMiddleware(thunk)) 
);

$(document).ready(function () {
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
});
//ReactDOM.render(<App />, document.getElementById('root'));