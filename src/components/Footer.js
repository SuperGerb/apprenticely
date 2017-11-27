import React, { Component } from 'react';
import { getYear } from "../app/utilities/date-functions.js";
import SignupCTA from './SignupCTA';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let year = getYear();
    return ( 
      <footer className="footer-bgimage"> 
        <p className="copyright-text">&copy; apprenticely {year}</p>
      </footer>
    )
  }
}

export default Footer;