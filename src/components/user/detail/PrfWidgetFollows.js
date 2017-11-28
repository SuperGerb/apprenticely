import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';

export default class PrfWidgetFollows extends Component {
  constructor(props) {
    super(props);

    // #### baseline state ####
    this.snapshotProfileOwner = this.props.profileOwnerFragment;
    this.snapshotProfileViewer = this.props.profileViewerFragment;
    let viewername = this.snapshotProfileViewer.username;

    // #### dynamic state ####
    this.state = {
      //meta state
      alertMessage: '',

      //update flags
      updatingFollowers:false,
      alreadyFollowed: (this.snapshotProfileOwner.followers.indexOf(viewername) == -1) ? false: true,

      //elements of interest
      followers: this.props.profileOwnerFragment.followers
    };

    this.prfClient = new PrfHttpClient();
  }

  // ######################### sub-widgets ##################
  renderAlert =()=>{
    if (!this.state.alertMessage) return null;
    return(
      <div className="card prf-errorbox">
        <div className="alert alert-danger" role="alert">
          {this.state.alertMessage}
        </div>
      </div>
    );
  }

  renderFollowButtons = () => {
    if ( (this.props.editable) || (this.state.updatingFollowers)){
      return null;//don't show any buttons
    }

    if (!this.state.alreadyFollowed) {
      return(<button type='button' className='btn btn-primary btn-block' onClick={this.triggerUpdateFollowers}>Follow</button>);
    } else {
      return(<button type='button' class='btn btn-outline-info btn-block' onClick={this.triggerUpdateFollowers}>Unfollow</button>);
    }
  }

  // ######################### Nano Event Handlers ##################

  // ######################### Micro Event Handlers (events internal to component) ########################
  
  // ############################## MACRO Event handlers & triggers #############################
  triggerUpdateFollowers = (e) => {
    e.preventDefault();
    if(this.state.alreadyFollowed){
      //unfollow
      this.prfClient.removeFollowFrom(this.snapshotProfileViewer,
        this.snapshotProfileOwner,
        this.onFollowersSaved);
    } else {
      //follow
      this.prfClient.addFollowFrom(this.snapshotProfileViewer,
        this.snapshotProfileOwner,
        this.onFollowersSaved);
    }
    this.setState({ updatingFollowers: true });
  }

  // ############################## COMPLETION EVENTS #############################
  onFollowersSaved =(responseData)=> {   
    if(!responseData.profileList){
      let scope = this;
      this.setState({alertMessage: 'Oops... try again?'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else if(responseData.profileList.length !=2) {
      let scope = this;
      this.setState({alertMessage: 'Oops... try again'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else {
      let updatedTo = responseData.profileList[1];
      let updatedFrom = responseData.profileList[0];
      this.snapshotProfileOwner.followers = updatedTo.followers;
      this.snapshotProfileViewer.following = updatedFrom.following;
      let alreadyfollowedToggle = !this.state.alreadyFollowed;
      this.setState({followers:updatedTo.followers, alreadyfollowed:alreadyfollowedToggle, updatingFollowers:false});
    }
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Followers
            <span className="badge badge-primary badge-pill">{this.state.followers.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Following
            <span className="badge badge-primary badge-pill">{this.snapshotProfileOwner.following.length}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {this.renderFollowButtons()}
          </li>
        </ul>
      </div>
    );
  }

}