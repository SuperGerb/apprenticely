//App.js

//modules
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrfHttpClient from 'profilic-client';

//components
import Navigation from './Navigation';
import Home from './Home';
import HomeAuthed from './HomeAuthed';
import ClassifiedDetailView from './ClassifiedDetailView';
import ClassifiedAdForm from './ClassifiedAdForm';
import AdCreatedConfirmation from './AdCreatedConfirmation';
import Landing from './Landing';
import Footer from './Footer';
import PrfProfilePage from './user/detail/PrfProfilePage';
import isAuthed from './user/auth/PrfAuthCheck';


export default class App extends Component {
  constructor(props) {
    super(props);
    // this.prfClient = new PrfHttpClient();
  }

  componentDidMount(){
    console.log("App has mounted!");
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="container-fluid">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/welcome' component={Landing} />
            <Route path='/home' component={isAuthed(HomeAuthed)} />
            <Route path='/classfiedDetailView' component={ClassifiedDetailView} />
            <Route path='/createClassifiedAd' component={ClassifiedAdForm} />
            <Route path='/adCreatedConfirmation' component={AdCreatedConfirmation} />
            <Route path="/user/:username" component={isAuthed(PrfProfilePage)} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}