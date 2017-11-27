//modules
import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';
import { Switch, Route, Link } from 'react-router-dom';

//components
import PrfSignupForm from './user/auth/PrfSignupForm';

class SignupCTA extends Component {
  constructor(props) {
    super(props);
    this.prfClient = new PrfHttpClient();
  }

  render() {
    // console.log("#########################", this.props.match.path);
    return (
      <div className="appr-sign-up-cta">
        <Link to='/welcome/signup' className='btn btn-primary accented'>Sign up to view the full site  »</Link>
        <Switch>
          <Route exact path='/welcome/signup' component={PrfSignupForm} />
        </Switch>
      </div>
    ) 
  }
}

export default SignupCTA;