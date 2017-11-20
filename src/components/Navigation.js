import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import {withRouter} from 'react-router';
import PrfHttpClient from 'profilic-client';
const JWTDecode = require('jwt-decode');

@withRouter
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed:false,
      username: ''
    };
    this.defaultNoAuthPath = process.env.PRF_DEFAULT_NOAUTH_PATH || "/";
    this.prfClient = new PrfHttpClient();
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("*** route change ***");
      this.prfClient.authenticate(this.checkAuthResult);
    });
  }

  componentWillMount = () => {
    //because the first listen doesn't fire on direct url hit (e.g. loading the page directly):
    this.prfClient.authenticate(this.checkAuthResult);
  }

  getCurrentUsername = () => {
    let token = localStorage.getItem('prf_authtoken');
    if(!token) return;
    let decodedUser = JWTDecode(token);
    return (decodedUser.username);
  }
    

  componentWillUnmount = () => {
    if(this.unlisten) this.unlisten();
  }

  checkAuthResult=(responseData)=>{
    console.log('Navigation::checkAuthResult');
    if(!responseData) {
        console.log('Navigation::checkAuthResult - invalid session');
        this.setState({isAuthed:false});
    } else {
        console.log('Navigation::checkAuthResult - still authed');
        let curUsername = this.getCurrentUsername();
        this.setState({isAuthed:true, username:curUsername});
    }
  }

  doLogout = (e) => {
    e.preventDefault();
    this.prfClient.logout();
    this.setState({isAuthed:false});
    this.props.history.push(this.defaultNoAuthPath);
  }

  render = () => {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse sticky-top">
        <button className="navbar-toggler navbar-toggler-right hidden-print" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/home"><img src="/images/site/apprlogo.png" alt="Apprenticely logo" /></Link><h1 className="sr-only">Logo</h1>
        {(this.state.isAuthed) ? (
          <a className="badge appr-nav-username" href={`/user/${this.state.username}`}>Logged in as {this.state.username}</a>
        ) : null}
        <div className="collapse navbar-collapse hidden-print" id="navbarSupportedContent">
          {(this.state.isAuthed) ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={this.doLogout}>Log Out</Link>
              </li>
            </ul>
          ) : (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/welcome/signup">Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/welcome/login">Log in</Link>
                </li>
              </ul>
            )}
          <Searchbar />
        </div>
      </nav>
    );
  }
}
