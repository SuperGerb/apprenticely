import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';

export default class PrfWidgetBio extends Component {
  constructor(props) {
    super(props);

    // #### baseline state ####
    this.snapshot = this.props.userFragment;

    // #### dynamic state ####
    this.state = {
      //meta state
      alertMessage: '',

      //upate flags
      updatingBio:false,

      //elements of interest
      bio: this.props.userFragment.bio
    };

    this.prfClient = new PrfHttpClient();
  }

  // ######################### Nano Event Handlers ##################
  onBioChange = (e) => {
    this.setState({ bio: e.target.value });
  }
  resetBio = () => {
    this.setState({bio: this.snapshot.bio, updatingBio:false});
  }

  // ######################### Micro Event Handlers (events internal to component) ########################
  beginBioEdits = () => {
    this.setState({updatingBio:true});
  }

  // ############################## MACRO Event handlers & triggers #############################
  triggerUpdateBio = (e) => {
    e.preventDefault();
    let theProfile = {_id:this.snapshot._id, bio: this.state.bio};
    this.prfClient.updateProfile(theProfile, this.onBioSaved);
  }

    // ############################## COMPLETION EVENTS #############################
    onBioSaved =(responseData)=> {
      this.updateLocalSnapshot(responseData, {updatingBio:false});    
    }

    updateLocalSnapshot = (responseData, microState) => {
      if(!responseData.profileList){
        console.error("PrfWidgetBio::updateLocalSnapshot : update failed!");
        let scope = this;
        this.setState({alertMessage: 'something went wrong with the update'}, function(){
          setTimeout(scope.setState({alertMessage:''}), 3000);
        });
      } else {
        console.log("PrfWidgetBio::updateLocalSnapshot : updating...");
        let updatedObj = responseData.profileList[0];
        this.snapshot.bio = updatedObj.bio;
        this.setState({bio:updatedObj.bio});
      }
    }

  render() {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h3 className="mb-1">About me</h3>
        </div>
        <div className="card prf-errorbox">
          {(this.state.alertMessage != '') ? (
            <div className="alert alert-danger" role="alert">
              {this.state.alertMessage}
            </div>
          ) : null}
        </div>
        <div>{this.state.bio}</div>
        <div>
          {(this.state.updatingBio)
            ? (
              <div className="card-body">
                <form className='prf-update-form'>
                  <div className="form-group">
                    <textarea
                      placeholder='Update your Bio...'
                      className='form-control'
                      rows='5'
                      cols='150'
                      value={this.state.bio}
                      onChange={this.onBioChange} />
                  </div>
                  <div className='btn-toolbar'>
                    <button type='button' value='cancel' className='btn btn-secondary' onClick={this.resetBio}>Cancel</button>
                    <button type='button' value='submit' className='btn btn-primary' onClick={this.triggerUpdateBio}>Update</button>
                  </div>
                </form>
              </div>
            )
            : null}
        </div>
        {(this.props.ownerIsViewer) ?
          <div>
            <button type="button" className="btn btn-sm" onClick={this.beginBioEdits}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          </div>
        : null}
      </div>
    );
  }

}