//App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navigation from './Navigation';
import Home from './Home';
import ClassifiedDetailView from './ClassifiedDetailView';
import ClassifiedAdForm from './ClassifiedAdForm';
import AdCreatedConfirmation from './AdCreatedConfirmation';


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
                    <Route path='/classfiedDetailView/:adId' component={ClassifiedDetailView} />
                    <Route path='/createClassifiedAd' component={ClassifiedAdForm} />
                    <Route path='/adCreatedConfirmation' component={AdCreatedConfirmation} />
                </div>
            </div>
        )
    } 
}