import React from 'react';
import {render} from 'react-dom';
import App from '../components/App';

$(document).ready(function () {
    render(<App/>, document.getElementById('root'));
});
// ReactDOM.displayTestValue(<App />, document.getElementById('testDiv'));

