import React, { Component } from 'react';
import PrfImageLoader from './PrfImageLoader';
import PrfWidgetBio from './PrfWidgetBio';
import PrfWidgetAvatar from './PrfWidgetAvatar';
import PrfWidgetFollows from './PrfWidgetFollows';
import PrfWidgetLinks from './PrfWidgetLinks';

const ListItemWidget =({title, content, editBtnName, editBtnHandler}) => ( 
  <div className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h3 className="mb-1">{title}</h3>
    </div>
    <div>{content}</div>
    {(editBtnName)?
    <div>
      <button type="button" className="btn btn-sm" onClick={editBtnHandler}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    </div>
    : null}
  </div>
);

const ListCaptionWidget =({captionText}) => ( 
  <div className="list-group-item list-group-item-action flex-column align-items-start active">
    <div className="d-flex w-100 justify-content-between">
      <h2 className="mb-1">{captionText}</h2>
    </div>
  </div>
);


export default class PrfProfileDetail extends Component {
    constructor(props) {
        super(props);
    }

    render =()=>{
      //we support flexible user entities, so eventually these need to evolve into handlers that
      //detect config settings (like enableAvatars, enableFollows, etc and not render anything at all, as needed )
      let categoryList = this.props.user.hasOwnProperty("categories") ? this.props.user.categories : [];
      let folksonomyTerms = this.props.user.hasOwnProperty("folkterms") ? this.props.user.keywords : [];

      //build content snippets
      let categories = categoryList.map( (catlabel) => {
        return (<button type="button" className="btn btn-primary btn-sm"> {catlabel} </button>);
      });

      let fterms = folksonomyTerms.map( (label) => {
        //note: taxonomic terms aren't handled by the user and don't need to be surfaced in the  UI atm.
        return (<button type="button" className="btn btn-primary btn-sm"> {label} </button>);
      });
      
      let bioFragment = { _id:this.props.user._id, bio:this.props.user.bio };

      let avatarSrc = this.props.user.hasOwnProperty("avatarSrc") ? this.props.user.avatarSrc : null;
      let avatarFragment = { _id:this.props.user._id, avatarSrc:avatarSrc };

      let ownerFollowersList = this.props.user.hasOwnProperty("followers") ? this.props.user.followers : [];
      let ownerfollowingList = this.props.user.hasOwnProperty("following") ? this.props.user.following : [];
      let viewerFollowingList = this.props.viewer.hasOwnProperty("following") ? this.props.viewer.following : [];
      let ownerFragment = { _id:this.props.user._id, username:this.props.user.username, followers:ownerFollowersList, following:ownerfollowingList };
      let viewerFragment = { _id:this.props.viewer._id, username:this.props.viewer.username, following:viewerFollowingList };

      let linkList = this.props.user.hasOwnProperty("links") ? this.props.user.links : '';
      let linksFragment = { _id:this.props.user._id, links: linkList};

      return (
        <div className="card-group prf-details">
          {/* card 1: user avatar and links */}
          <div className="card prf-vcard prf-infobox">
            <div className="card-body">
              <PrfWidgetAvatar userFragment={avatarFragment} editable={this.props.ownerIsViewer} />
              <PrfWidgetFollows profileOwnerFragment={ownerFragment} profileViewerFragment={viewerFragment} editable={this.props.ownerIsViewer} />
            </div>
          </div>
          {/* card 2: bio, categories, keywords etc */}
          <div className="card prf-stretchbox prf-infobox">
            <div className="card-body">
              <div className="list-group">
                <ListCaptionWidget captionText={this.props.user.username}/>
                <PrfWidgetBio userFragment={bioFragment} editable={this.props.ownerIsViewer} />
                <PrfWidgetLinks userFragment={linksFragment} editable={this.props.ownerIsViewer} />
                <ListItemWidget title='My craft' content={categories} editBtnName={(this.props.ownerIsViewer)? 'Edit':null} />
                <ListItemWidget title='Favorite tags' content={categories} editBtnName={(this.props.ownerIsViewer)? 'Edit':null} />
              </div>
            </div>
          </div>
        </div>
      );
    }
}