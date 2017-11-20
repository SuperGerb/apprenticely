import React, { Component } from 'react';
import ClassifiedAdsList from './ClassifiedAdsList';
import CreateClassifiedAdButton from './CreateClassifiedAdButton';
import PrfUserProfileList from './user/list/PrfUserProfileList';
import PrfHttpClient from 'profilic-client';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      profileList:[]
    };
    this.prfClient = new PrfHttpClient();
  }

  componentDidMount =()=>{
    this.getLatestProfiles();
  }

  getLatestProfiles =()=> {
    this.prfClient.getProfiles(this.populateList);
  }

  populateList = (responseData) => {
    console.log("**************************|", responseData);

    if(!responseData) {
      console.log("Error retrieving list of profiles!");
      return;
    }
    this.setState({ profileList:responseData.profileList });
  }

  render() {
    return (
      <div>
        <section className="appr-bgimage short">
        </section>
        <section className="appr-main">
          <div>
              <ClassifiedAdsList />
              <CreateClassifiedAdButton />
              <h3>Our newest Members</h3>
              <PrfUserProfileList profileList={this.state.profileList} 
                orientation="vertical"
                notifyOnChanges={this.getLatestProfiles} />
          </div>
        </section>
      </div>
    );
  }

}
