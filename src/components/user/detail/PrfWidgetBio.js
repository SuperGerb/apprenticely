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

  renderEditingPanel = () => {
    if(!this.state.updatingBio) return null;
    return(
      <div className="card-body">
        { this.renderAlert() }
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
    );
  }

  renderEditButton = () => {
    if(this.props.editable && !this.state.updatingBio) {
      return(
        <div>
          <button type="button" className="btn btn-primary" onClick={this.beginBioEdits}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </div>
      );
    } else {
      return null;
    }
  }


  // ######################### Nano Event Handlers ##################
  onBioChange = (e) => {
    this.setState({ bio: e.target.value });
  }
  resetBio = () => {//discards edits, returns to original view
    this.setState({bio: this.snapshot.bio, updatingBio:false});
  }

  // ######################### Micro Event Handlers (events internal to component) ########################
  beginBioEdits = () => {
    this.setState({updatingBio:true});
  }

  // ############################## MACRO Event handlers & triggers #############################
  triggerUpdateBio = (e) => {
    e.preventDefault();
    if(this.state.bio == this.snapshot.bio) {
      //if nothing has changed, the updateOne check will fail, so avoid this scenario altogether:
      //quietly do nothing.
      this.resetBio();
    } else {
      let theProfile = {_id:this.snapshot._id, bio: this.state.bio};
      this.prfClient.microUpdate(theProfile, this.onBioSaved);
    }
  }

  // ############################## COMPLETION EVENTS #############################
  onBioSaved =(responseData)=> {   
    if(!responseData.profileList){
      let scope = this;
      this.setState({alertMessage: 'something went wrong with the update'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else {
      let updatedObj = responseData.profileList[0];
      this.snapshot.bio = updatedObj.bio;
      this.setState({bio:updatedObj.bio, updatingBio:false});
    }
  }

  render() {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h3 className="mb-1">About me</h3>
        </div>
        <div>{this.state.bio}</div>
        {this.renderEditingPanel()}
        {this.renderEditButton()}
      </div>
    );
  }

}