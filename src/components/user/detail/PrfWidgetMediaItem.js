import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';
import PrfImageLoader from './PrfImageLoader';
const uuidv1 = require('uuid/v1');

export default class PrfWidgetMediaItem extends Component {
  constructor(props) {
    super(props);

    // #### baseline state ####
    this.snapshot = this.props.mediaItem;

    // #### dynamic state ####
    this.state = {
      //meta state
      alertMessage: '',

      //upate flags
      updatingItem:0, //0=not updating  1=updating 2=updates ready to save
      
      //elements of interest
      itemId: this.props.mediaItem.id,
      itemType: this.props.mediaItem.type, //picture|embed
      itemTitle: this.props.mediaItem.title,
      itemUrl: this.props.mediaItem.url
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

  renderItem(){
    if(this.state.updatingItem == 1) {
      return(this.renderEditingPanel());
    }

    let itembody = null;
    let controlbuttons = null;

    if(this.state.itemType == 'picture') {
      itembody = (<img src={this.state.itemUrl} className="prf-mediapic"/>);
    } else {
      itembody = (<p>
      TODO: Can hold photo|video widget|audio widget<br/>
      </p>);
    }

    if(this.props.editable) {
      if(this.state.updatingItem == 2) {
        //finalize edits
        controlbuttons = (
          <div className="prf-media-choices">
            <button type="button" name="picture" className="btn btn-secondary" onClick={this.resetItem}>Cancel</button>
            <button type="button" name="picture" className="btn btn-primary" onClick={this.triggerUpdate}>Save Edits</button>
          </div>
        );
      } else {
        //initiate edits
        controlbuttons = (
          <div className="prf-media-choices">
            <button type="button" name="picture" className="btn btn-primary" onClick={this.beginPictureEdit}><i className="fa fa-picture-o fa-lg"></i></button>
            <button type="button" name="embed" className="btn btn-primary" onClick={this.beginItemEdits}><i className="fa fa-soundcloud fa-lg"></i></button>
            <button type="button" name="embed" className="btn btn-primary" onClick={this.beginItemEdits}><i className="fa fa-youtube-square fa-lg"></i></button>
            <button type="button" className="btn btn-danger" onClick={this.triggerDelete}><i className="fa fa-trash-o fa-lg"></i></button>
          </div>
        );
      }
    }

    return(
      <div className="card-text prf-mediabox-content">
        <h4>{this.state.itemTitle}</h4>
        {itembody}
        {controlbuttons}
      </div>
    );
  }

  renderEditingPanel = () => {
    return(
      <div className="card-body prf-mediabox-item">
        { this.renderAlert() }
        {(this.state.itemType == 'picture') ? (
           <form className='prf-update-form'>
            <div className="form-group">
              <input
                type='text'
                name='itemTitle'
                placeholder='Enter a title'
                className='form-control'
                cols='150'
                value={this.state.itemTitle}
                onChange={this.onItemChange} />
              <PrfImageLoader onSubmit={this.onImageLoaded} />
            </div>
            </form>

        ): (
          <form className='prf-update-form'>
            <div className="form-group">
              <input
                type='text'
                name='itemTitle'
                placeholder='Enter a title'
                className='form-control'
                cols='150'
                value={this.state.itemTitle}
                onChange={this.onItemChange} />
              <input
                type='text'
                name='itemUrl'
                placeholder='Enter youtube|soundcloud url'
                className='form-control'
                cols='150'
                value={this.state.itemUrl}
                onChange={this.onItemChange} />
            </div>
            <div className='btn-toolbar'>
              <button type='button' value='cancel' className='btn btn-secondary' onClick={this.resetItem}>Cancel</button>
              <button type='button' value='submit' className='btn btn-primary' onClick={this.triggerUpdate}>Save</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // ######################### Nano Event Handlers ##################
  onItemChange = (e) => {
    e.preventDefault();
    let microState = {};
    microState[e.target.name] = e.target.value;
    this.setState(microState);
  }
  resetItem = () => {//discards edits, returns to original view
    this.setState({
      itemId: this.snapshot.id,
      itemType: this.snapshot.type,
      itemTitle: this.snapshot.title,
      itemUrl: this.snapshot.itemUrl,
      updatingItem:0});
  }

  // ######################### Micro Event Handlers (events internal to component) ########################
  beginPictureEdit = (e) => {
    e.preventDefault();
    this.setState({itemType:'picture', updatingItem:1});
  }

  beginItemEdits = (e) => {
    e.preventDefault();
    this.setState({itemType:e.target.name, updatingItem:1});
  }

  // ############################## MACRO Event handlers & triggers #############################
  onImageLoaded = (base64Image) => {
    if(!base64Image) {
      this.resetItem();
    } else {
      this.setState({itemUrl:base64Image, updatingItem:2});
    }
  }
  triggerUpdate = (e) => {
    e.preventDefault();
    let newMediaItem = {id:uuidv1(), type:this.state.itemType, title:this.state.itemTitle, url: this.state.itemUrl};

    //notify parent:
    this.props.notifyOnChange(newMediaItem);
  }

  triggerDelete = (e) => {
    e.preventDefault();
    //notify parent:
    this.props.notifyOnDelete(this.state.itemId);
  }

  // ############################## COMPLETION EVENTS #############################

  render() {
    return(
      <div className="prf-mediabox-item">
        <div className="card-body">
        {this.renderItem()}
        </div>
      </div>
    );
  }

}