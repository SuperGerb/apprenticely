import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';

export default class PrfWidgetLinks extends Component {
  constructor(props) {
    super(props);

    // #### baseline state ####
    this.snapshot = this.props.userFragment;

    // #### dynamic state ####
    this.state = {
      //meta state
      alertMessage: '',

      //upate flags
      updatingLinks:false,

      //elements of interest
      links: this.props.userFragment.links
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
    if(!this.state.updatingLinks) return null;
    return(
      <div className="card-body">
        { this.renderAlert() }
        <div className="alert alert-success" role="alert">
        <p>Enter links to your websites (e.g."http://example.com, http://twitter.com/myname")...</p>
        </div>
        <form className='prf-update-form'>
          <div className="form-group">
            <textarea
              className='form-control'
              rows='5'
              cols='150'
              value={this.state.links}
              onChange={this.onLinksChange} />
          </div>
          <div className='btn-toolbar'>
            <button type='button' value='cancel' className='btn btn-secondary' onClick={this.resetLinks}>Cancel</button>
            <button type='button' value='submit' className='btn btn-primary' onClick={this.triggerUpdateLinks}>Update</button>
          </div>
        </form>
      </div>
    );
  }

  renderEditButton = () => {
    if(this.props.editable && !this.state.updatingLinks) {
      return(
        <div>
          <br/>
          <button type="button" className="btn btn-primary" onClick={this.beginLinksEdits}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </div>
      );
    } else {
      return null;
    }
  }


  // ######################### Nano Event Handlers ##################
  onLinksChange = (e) => {
    this.setState({ links: e.target.value });
  }
  resetLinks = () => {//discards edits, returns to original view
    this.setState({links: this.snapshot.links, updatingLinks:false});
  }

  // ######################### Micro Event Handlers (events internal to component) ########################
  beginLinksEdits = () => {
    this.setState({updatingLinks:true});
  }

  // ############################## MACRO Event handlers & triggers #############################
  triggerUpdateLinks = (e) => {
    e.preventDefault();
    if(this.state.links == this.snapshot.links) {
      //if nothing has changed, the updateOne check will fail, so avoid this scenario altogether:
      //quietly do nothing.
      this.resetLinks();
    } else {
      let theProfile = {_id:this.snapshot._id, links: this.state.links};
      this.prfClient.microUpdate(theProfile, this.onLinksSaved);
    }
  }

  // ############################## COMPLETION EVENTS #############################
  onLinksSaved =(responseData)=> {   
    if(!responseData.profileList){
      let scope = this;
      this.setState({alertMessage: 'something went wrong with the update'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else {
      let updatedObj = responseData.profileList[0];
      this.snapshot.links = updatedObj.links;
      this.setState({links:updatedObj.links, updatingLinks:false});
    }
  }

  render() {
    let linksArray = this.state.links.match(/\S+/g) || []; //break apart on whitespace
    let linksDisplay = linksArray.map( (link, idx) => {//bad - shouldn't use idx. But just demoing...
      let lnk = link.toLowerCase();
      let cssString = "fa fa-globe";
      if ( lnk.indexOf('twitter') != -1 ) cssString = "fa fa-twitter-square";
      else if ( lnk.indexOf('facebook') != -1) cssString = "fa fa-facebook-square";
      else if ( lnk.indexOf('instagram') != -1) cssString = "fa fa-instagram";
      else if ( lnk.indexOf('linkedin') != -1) cssString = "fa fa-linkedin-square";
      else if ( lnk.indexOf('youtube') != -1) cssString = "fa fa-youtube";
      else if ( lnk.indexOf('deviantart') != -1) cssString = "fa fa-deviantart";
      else if ( lnk.indexOf('behance') != -1) cssString = "fa fa-behance-square";
      else if ( lnk.indexOf('soundcloud') != -1) cssString = "fa fa-soundcloud";
      return(<li className={cssString} key={idx}><a href={lnk} target='_blank'>{lnk}</a></li>);
    });

    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h3 className="mb-1">Personal Links</h3>
        </div>
        <div>
          <ul className="list-group prf-user-links">
          {linksDisplay}
          </ul>
        </div>
        {this.renderEditingPanel()}
        {this.renderEditButton()}
      </div>
    );
  }

}