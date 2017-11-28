//PrfProfilePage.js
import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import PrfHttpClient from 'profilic-client';
import PrfProfileDetail from './PrfProfileDetail';
import PrfWidgetMediaBox from './PrfWidgetMediaBox';
const JWTDecode = require('jwt-decode');

export default class PrfProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerIsViewer:false,
      profileViewer:null, //the person who is viewing this profile page
      profileOwner:null//the person whose profile this is
    };
    
    this.defaultLogoutPath = process.env.PRF_DEFAULT_NOAUTH_PATH || "/";
    this.prfClient = new PrfHttpClient();
  }

  componentDidMount =()=>{
    console.log("PrfProfilePage::componentDidMount");
    let token = localStorage.getItem('prf_authtoken');
    let decodedUser = null;
    let ownerIsViewerFlag = false;
    
    if(token){
      decodedUser = JWTDecode(token);
      console.log(decodedUser);
      ownerIsViewerFlag = (decodedUser.username == this.props.match.params.username) ? true : false;
    }
    //fetch info for the requested profile
    this.setState({profileViewer:decodedUser, ownerIsViewer:ownerIsViewerFlag});
    this.prfClient.getProfilesByUsernameList( [this.props.match.params.username, decodedUser.username], this.onProfilesFetched);
  }

  onProfilesFetched = (responseData) => {
    console.log("PrfProfilePage::onProfilesFetched");
    if(!responseData) {
      this.setState({alertMessage:"We've encountered a problem. Please try again."});
      return;
    }

    //findProfileOwner
    let ownername = this.props.match.params.username;
    let viewername = this.state.profileViewer.username;
    let owner = responseData.profileList.find( p => p.username == ownername );
    let viewer = responseData.profileList.find( p => p.username == viewername );
    
    if(owner && viewer) {//gotta have both
      this.setState({profileOwner:owner, profileViewer:viewer});
    } else {
      this.setState({alertMessage:"We've encountered a problem. Please try again."});
      return;
    }
  }

  render=()=>{
    if(this.state.loggedOut) {
      return( <Redirect to={this.defaultLogoutPath} from={this.props.match.url} push /> );
    }
    if(!this.state.profileOwner) return null; //display only once the profile info is ready
    let medialist = this.state.profileOwner.hasOwnProperty('medialist') ? this.state.profileOwner.medialist : [];
    return(
      <div className="container-fluid">
        <PrfProfileDetail user={this.state.profileOwner} viewer={this.state.profileViewer} ownerIsViewer={this.state.ownerIsViewer}/>
        <PrfWidgetMediaBox userFragment={ {_id:this.state.profileOwner._id, medialist:medialist} } ownerIsViewer={this.state.ownerIsViewer}/>
      </div>
    );
  }
}