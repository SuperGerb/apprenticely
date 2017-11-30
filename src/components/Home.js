import React, { Component } from 'react';
import ClassifiedAdsList from './ClassifiedAdsList';
import CreateClassifiedAdButton from './CreateClassifiedAdButton';
import SignupCTA from './SignupCTA';
import PrfUserProfileList from './user/list/PrfUserProfileList';
import PrfHttpClient from 'profilic-client';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileList: []
    };
    this.prfClient = new PrfHttpClient();
  }

  componentDidMount = () => {
    this.getLatestProfiles();
    this.fadeOutMessageBox();
  }

  getLatestProfiles = () => {
    this.prfClient.getProfiles(this.populateList);
  }

  populateList = (responseData) => {
    console.log("**************************|", responseData);

    if (!responseData) {
      console.log("Error retrieving list of profiles!");
      return;  
    }
    this.setState({ profileList: responseData.profileList });
  }
 
  scrollToPostings = () => {
    let distance = $(".appr-main").offset().top - 60;
    $("html,body").animate({scrollTop: distance}, 600);
  }

  fadeOutMessageBox=()=>{
    $(".confirmation-message-box").delay(2000).fadeOut();
  }

  render() {
    //For displaying success message when redirecting from ClassifiedAdForm component: 
    if (this.props.location.state !== undefined) {
      var message = this.props.location.state.message;
    }

    return (
      <div>
        <CreateClassifiedAdButton />
        <section className="appr-bgimage short">
          {message ? <div className="confirmation-message-box"><p>{message}</p></div> : null}
          <div className="row appr-hero width-constrained">
            <div className="appr-hero-box">
              <h4 className="appr-hero-caption">Find collabs, gigs, equipment, constructive critiques and more.</h4>
              {/* <p className="appr-hero-copy">Apprenticely gathers together the best postings relating to the arts. See what others are working on. Pick up a new hobby. Post samples of your latest project.</p>
              The journey to mastery begins with practice */}
            </div>
          </div>
          <p className="appr-main-cta" onClick={this.scrollToPostings}>browse the latest postings<i className="fa fa-angle-down" aria-hidden="true"></i></p>
        </section>
        <section className="appr-main">
          <div>
            <h3 className="appr-main-caption">Latest announcements</h3>
            <ClassifiedAdsList /> 
            <h3 className="appr-main-caption"> Our newest Members</h3>
            <PrfUserProfileList profileList={this.state.profileList}
              orientation="vertical"/>
          </div>
        </section>
        {(!this.prfClient.getAuthedUsername()) ? (
          <SignupCTA />
        ) : null }
      </div>
    );
  }

}
