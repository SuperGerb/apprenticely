//App.js
import React, { Component } from 'react';
import Navigation from './Navigation';
import ClassifiedAdsList from './ClassifiedAdsList';
import Searchbar from './Searchbar';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container-fluid">
                    <ClassifiedAdsList />
                </div>
                {/*  <!--/.container--> */}
            </div>
        )
    }
}