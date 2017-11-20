import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navigation = (props) => (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse sticky-top">
	  <button className="navbar-toggler navbar-toggler-right hidden-print" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span className="navbar-toggler-icon"></span>
	  </button>
	  <Link className="navbar-brand" to="/home"><img src="/images/site/apprlogo.png" alt="Apprenticely logo" /></Link><h1 className="sr-only">Logo</h1>
	  <div className="collapse navbar-collapse hidden-print" id="navbarSupportedContent">
      {(props.isLoggedIn)?(
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={this.props.notifyLoginStatus(false)}>Log Out</a>
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
)

export default Navigation;