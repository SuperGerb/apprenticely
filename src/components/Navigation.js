import React, { Component } from 'react';
import Searchbar from './Searchbar';

const Navigation = (props) => (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse sticky-top">
	  <button className="navbar-toggler navbar-toggler-right hidden-print" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span className="navbar-toggler-icon"></span>
	  </button>
	  <a className="navbar-brand" href="/"><img src="/images/site/apprlogo.png" alt="Apprenticely logo" /></a><h1 className="sr-only">Logo</h1>
	  <div className="collapse navbar-collapse hidden-print" id="navbarSupportedContent">
	    <ul className="navbar-nav mr-auto">
	      <li className="nav-item">
	        <a className="nav-link" href="/signup">Sign up</a>
	      </li>
          <li className="nav-item">
	        <a className="nav-link" href="/login">Log in</a>
	      </li>
	    </ul>
	    <Searchbar />
	  </div>
	</nav>
)

export default Navigation;