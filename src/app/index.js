import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom'; 



$(document).ready(function () {
    render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
});
//ReactDOM.render(<App />, document.getElementById('root'));