//App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navigation from './Navigation';
import Home from './Home';
import ClassifiedDetailView from './ClassifiedDetailView';


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container-fluid">
                    <Route exact path='/' component={Home} />
                    <Route path='/classfiedDetailView' component={ClassifiedDetailView} />
                </div>
            </div>
        )
    } 
}