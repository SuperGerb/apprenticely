//PrfBaseAuthForm.js
import React, { Component } from "react";
import PrfHttpClient from 'profilic-client';
import JSClientUtils from '../../../utils/js-client-utils';

//Base class for handling signup and login transactions
export default class PrfBaseAuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      alertMessage: '',
      authComplete:false
    };
    this.prfClient = new PrfHttpClient();
    this.defaultNoAuthPath = process.env.PRF_DEFAULT_NOAUTH_PATH || "/";
    this.lastSignupAttempt = null;
  }

  resetForm=()=>{
    this.setState({
      email: '',
      username: '',
      password: '',
      alertMessage: ''
    });  
  }

  onInputChange = (e) => {
    let tmpState = {alertMessage: ''};
    let fieldName = e.target.name;

    //since the user cannot see what they are typing in the pwd box, we leave it as-is
    //as there's no visual feedback for the user to know that we're trimming their input:
    tmpState[fieldName] = (fieldName != 'password') ? e.target.value.trim() : e.target.value;
    this.setState(tmpState);
  }

  cancelSubmission=(e)=>{
    e.preventDefault();
    this.resetForm();
    this.props.history.push(this.defaultNoAuthPath);
  }

  doSignup =(e)=> {
    e.preventDefault();
    console.log('PrfBaseAuthForm::doSignup');
    let email = this.state.email;
    let username = this.state.username;
    let password = this.state.password;

    if( email == '' || username == '' || password == '' ) {
      this.setState({alertMessage :'Please do not leave any fields blank'});
      return;
    }
    //TODO: block spaces, and any of # < > [ ] | { } / @, block anything that looks like an ip adress(x.x.x.x)
    if(password.indexOf(' ') != -1 ) {
      this.setState({alertMessage :'You cannot have spaces in your password'});
      return;
    }
    if ( !JSClientUtils.validateEmail(email) ) {
      this.setState({alertMessage :'The email provided is not valid'});
      return;
    }

    //TODO: other validation
    //...

    //checks ok
    let newUser = {username:username, password:password, email:email};
    this.lastSignupAttempt = newUser;
    console.log('PrfBaseAuthForm::doSignup - sending signup info...');
    this.prfClient.signupNewProfile(newUser, this.onSignupComplete);
  }

  onSignupComplete =(responseData)=> {
    if(!responseData) {
      this.setState({alertMessage :'Could not complete the signup process. Please try again'});
    } else {
        if(responseData.insertedCount == 1){
          this.resetForm();
          console.log('PrfBaseAuthForm::onSignupComplete - successfully created new profile');
          console.log(responseData.profileList);
        } else {
          console.error("PrfBaseAuthForm::onSignupComplete : signup request failed");
        }
    }
    //log them in:
    this.prfClient.login(this.lastSignupAttempt , this.onLoginComplete);
  }
 
  doLogin =(e)=> {
    e.preventDefault();
    console.log('PrfBaseAuthForm::doLogin');

    let username = this.state.username;
    let password = this.state.password;

    if( username == '' || password == '' ) {
      this.setState({alertMessage :'Please do not leave any fields blank'});
      return;
    }

    let theUser = {username:username, password:password};
    console.log('PrfBaseAuthForm::doLogin - sending login credentials...');
    this.prfClient.login(theUser, this.onLoginComplete);
  }

  onLoginComplete =(responseData)=> {
    if(!responseData) {
      console.log('PrfBaseAuthForm::onLoginComplete, received', responseData);
      this.setState({alertMessage :'Could not validate your credentials... Please try again'});
    } else {
      console.log('PrfBaseAuthForm::onLoginComplete, received', responseData);
      const token = responseData.prf_authtoken;
      localStorage.setItem('prf_authtoken',token);
      this.prfClient.setAuthHeader(token);
      this.setState({authComplete:true});
    }
  }

  render() { 
    return null; //child classes to reimplement
  }
}