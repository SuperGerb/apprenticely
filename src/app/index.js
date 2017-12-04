import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import reducer from '../store/reducers/reducer';

const store = createStore(reducer);

$(document).ready(function () {
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
});
//ReactDOM.render(<App />, document.getElementById('root'));