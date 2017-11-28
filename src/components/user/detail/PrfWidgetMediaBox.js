import React, { Component } from 'react';
import PrfHttpClient from 'profilic-client';
import PrfWidgetMediaItem from './PrfWidgetMediaItem';

export default class PrfWidgetMediaBox extends Component {
  constructor(props) {
    super(props);
    this.snapshot = this.props.userFragment;

    //convert medialist to hashmap for easier handling:
    this.mediamap = this.toMap(this.props.userFragment.medialist);

    this.state = {
      alertMessage: '',
      medialist: this.props.userFragment.medialist
    };

    this.prfClient = new PrfHttpClient();
  }

  toMap=(mediaList)=>{
    let theMap = new Map(mediaList.map( 
      (m) => [m.id, {id:m.id, type:m.type, title:m.title, url:m.url}] 
    ));
    return (theMap);
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
  // ######################### Nano Event Handlers ##################

  // ######################### Micro Event Handlers (events internal to component) ########################

  // ############################## MACRO Event handlers & triggers #############################
  notifyOnChange = (newItem) => {
    if(!newItem.id) return;
    if(newItem.id == -1) return;

    this.mediamap.set(newItem.id, newItem);
    this.triggerUpdate();
  }

  notifyOnDelete = (itemId) =>
  {
    this.mediamap.delete(itemId);
    this.triggerUpdate();
  }

  triggerUpdate(){
    let newMediaList = Array.from(this.mediamap, (m)=>{ return m[1] });
    let theProfile = {_id:this.snapshot._id, medialist: newMediaList};
    this.prfClient.microUpdate(theProfile, this.onUpdated); 
  }


  // ############################## COMPLETION EVENTS #############################
  onUpdated =(responseData)=> {   
    if(!responseData.profileList){
      this.mediamap = this.toMap(this.snapshot.medialist); //fallback to baseline
      let scope = this;
      this.setState({medialist:this.snapshot.medialist, alertMessage: 'something went wrong with the update'}, function(){
        setTimeout(scope.setState({alertMessage:''}), 3000);
      });
    } else {
      let updatedObj = responseData.profileList[0];
      this.snapshot.medialist = updatedObj.medialist;
      this.mediamap = toMap(this.snapshot.medialist);
      this.setState({medialist:updatedObj.medialist});
    }
  }

  render() {
    let items = [];
    if(this.state.medialist.length > 0) {
      items = this.state.medialist.map( (m) => {
        return ( <PrfWidgetMediaItem key={m.id} mediaItem={m} 
                    notifyOnChange = {this.notifyOnChange}
                    notifyOnDelete = {this.notifyOnDelete}
                    editable={this.props.ownerIsViewer} /> );
      });
    } else {
      //temporary - should be an add blank tile button
      let placeholder = {
        id: -1,
        type: 'picture',
        title: 'Add a new item to show off your creations!',
        url: '/images/site/media.png'
      };

      items.push( <PrfWidgetMediaItem key={-1} mediaItem={placeholder} 
        notifyOnChange={this.notifyOnChange}
        notifyOnDelete={this.notifyOnDelete} 
        editable={this.props.ownerIsViewer}/> );
    }
    
    console.log("***************");
    console.log(items);
    return (
      <div className="prf-mediabox-wrap">
        <h2>Mini Portfolio</h2>
        {this.renderAlert()}
        <div className="prf-mediabox">
          {items}
        </div>
      </div>
    );
  }

}