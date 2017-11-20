//PrfProfilePage.js
import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import PrfHttpClient from 'profilic-client';
import PrfProfileDetail from './PrfProfileDetail';
const JWTDecode = require('jwt-decode');

const PopupMessage = ({message}) => (
  <div className="modal fade" id="alertbox" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Notice</h5>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {message}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
)

export default class PrfProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: '',
      loggedOut: false,
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

  doLogout = () => {
    this.prfClient.logout();
    this.setState({loggedOut:true});
  }

  notifyOnFollow = ()=> {
    console.log("PrfProfilePage::notifyOnFollow");
    this.prfClient.addFollowFrom(this.state.profileViewer, this.state.profileOwner, this.onFollowed);
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

  onFollowed = (responseData) => {
    console.log("PrfProfilePage::onFollowed");
    if(!responseData) {
      this.setState({alertMessage:"A problem occured... Please try again"}, function(){
        $('#alertbox').modal('toggle');        
      });
    } else {
      console.log(responseData); //should return updated follower, followed.
      //findProfileOwner
      let ownername = this.props.match.params.username;
      let viewername = this.state.profileViewer.username;
      let owner = responseData.profileList.find( p => p.username == ownername );
      let viewer = responseData.profileList.find( p => p.username == viewername );
      this.setState({ profileOwner: owner, profileViewer: viewer});
    }
  }

  render=()=>{
    console.log(1);
    if(this.state.loggedOut) {
      console.log(2);
      return( <Redirect to={this.defaultLogoutPath} from={this.props.match.url} push /> );
    }
    console.log(3);
    return(
      <div className="container-fluid">
        <div className='btn-toolbar'>
          <button onClick={this.doLogout} type='button' className='btn btn-primary'>Logout</button>
        </div>

        {/* display only once the profile info is ready */}
        {(this.state.profileOwner)?
          <PrfProfileDetail user={this.state.profileOwner} viewer={this.state.profileViewer} ownerIsViewer={this.state.ownerIsViewer}
          onFollow={this.notifyOnFollow} />
        : null}

        {/* popup alertbox */}
        <PopupMessage message={this.state.alertMessage}/>
      </div>
    );
  }
}