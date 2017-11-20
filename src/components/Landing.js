//modules
import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';
import { Switch, Route, Link} from 'react-router-dom';

//components
import PrfSignupForm from './user/auth/PrfSignupForm';
import PrfLoginForm from './user/auth/PrfLoginForm';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.prfClient = new PrfHttpClient();
  }

  render() {
    console.log("#########################", this.props.match.path);
    return (
      <div>
        <section className="appr-bgimage">
          <div className="row appr-hero">
            <div className="appr-hero-box">
              <h4 className="appr-hero-caption">The Journey to Mastery <br />begins with practice</h4>
              <p className="appr-hero-copy">Find collabs, gigs, equipment, constructive critiques and more.</p>
              <p>
              <Link to='/welcome/signup' className='btn btn-primary accented'>Get Started »</Link>
              <Link to='/welcome/login' className='btn btn-primary'>Login</Link>
              </p>
              <Switch>
                <Route exact path='/welcome/login' render={ (props) => { return (<PrfLoginForm notifyLoginStatus={this.props.notifyLoginStatus} {...props} />); } } />
                <Route exact path='/welcome/signup' component={PrfSignupForm} />
              </Switch>
            </div>
          </div>
        </section>
        <section className="appr-main">
        </section>
      </div>
    );
  }

}


