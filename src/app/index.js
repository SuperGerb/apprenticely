import React from 'react';
//import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import App from '../components/App';

$(document).ready(function () { 
    render(<App/>, document.getElementById('root'));
});
//ReactDOM.render(<App />, document.getElementById('root'));

