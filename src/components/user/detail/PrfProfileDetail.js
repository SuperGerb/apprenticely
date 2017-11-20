import React, { Component } from 'react';
import PrfImageLoader from './PrfImageLoader';
import PrfBaseProfile from './PrfBaseProfile';

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

const FollowWidget = ({numfollowers, numfollowing}) => (
  <ul className="list-group">
    <li className="list-group-item d-flex justify-content-between align-items-center">
      Followers
      <span className="badge badge-primary badge-pill">{numfollowers}</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      Following
      <span className="badge badge-primary badge-pill">{numfollowing}</span>
    </li>
  </ul>
);

const UpdateFormWidgetBio = ({initValue, changeHandler, cancelHandler, updateHandler}) =>(
  <div>
    <p>{initValue}</p>
    { (toBeUpdated)
      ? (
      <form className='prf-update-form'>
        <div className="form-group">
          <textarea
          placeholder='Update your Bio...'
          className='form-control'
          value={ initValue }
          onChange={ changeHandler } />
        </div>
        <div className='btn-toolbar'>
          <button type='button' value='cancel' className='btn btn-secondary btn-sm' onClick={ cancelHandler }>Cancel</button>
          <button type='button' value='submit' className='btn btn-primary btn-sm' onClick={ updateHandler }>Update</button>
        </div>
      </form>) : null}
    </div>
);

export default class PrfProfileDetail extends PrfBaseProfile {
    constructor(props) {
        super(props);
    }

    render =()=>{
      //we support flexible user entities, so eventually these need to evolve into handlers that
      //detect config settings (like enableAvatars, enableFollows, etc and not render anything at all, as needed )
      //let avatarSrc = this.props.user.hasOwnProperty("avatar") ? this.props.user.avatar : this.noAvatarBase64Img;
      let urlList = this.props.user.hasOwnProperty("urls") ? this.props.user.urls : [];
      let followersList = this.props.user.hasOwnProperty("followers") ? this.props.user.followers : [];
      let followingList = this.props.user.hasOwnProperty("following") ? this.props.user.following : [];
      let categoryList = this.props.user.hasOwnProperty("categories") ? this.props.user.categories : [];
      let folksonomyTerms = this.props.user.hasOwnProperty("folkterms") ? this.props.user.keywords : [];

      //build content snippets
      let urls = urlList.map( (u) => {
        return ( <p className="card-text">u</p> );
      });
      let followers = followersList.length;
      let following = followingList.length;
      let fwidget = (<FollowWidget numfollowers={followers} numfollowing={following} />);
      let categories = categoryList.map( (catlabel) => {
        return (<button type="button" className="btn btn-primary btn-sm"> {catlabel} </button>);
      });

      let fterms = folksonomyTerms.map( (label) => {
        //note: taxonomic terms aren't handled by the user and don't need to be surfaced in the  UI atm.
        return (<button type="button" className="btn btn-primary btn-sm"> {label} </button>);
      });

      let updateablebio = (<UpdateFormWidgetBio initValue={this.state.bio} changeHandler={this.onBioChange} toBeUpdated={this.state.toBeUpdated}/>)

      return (
        <div className="container-fluid">
          <div className="card prf-errorbox">
            {(this.state.alertMessage != '') ? (
              <div className="alert alert-danger" role="alert">
                {this.state.alertMessage}
              </div>
            ) : null}
          </div>
          {/* ################# core user details #################### */}
          <div className="card-group prf-details">
            {/* card 1: user avatar and links */}
            <div className="card prf-vcard prf-infobox">
              <div className="card-body">
                {(!this.state.updatingAvatarSrc)? (
                  <img className="card-img-top prf-avatar" src={this.state.avatarSrc}/>
                ) : (
                  <PrfImageLoader onSubmit={this.onDropAvatarImg} />
                )}
                {(!this.state.updatingAvatarSrc && this.props.ownerIsViewer)?
                  <button className="btn btn-block" onClick={this.beginAvatarUpload}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Change your avatar</button>
                  : null}
                {fwidget}
                {(!this.props.ownerIsViewer)?  (
                  <button type="button" className="btn btn-primary btn-block" onClick={this.props.onFollow}>Follow</button>
                ):null}
              </div>
              <div className="card-footer"></div>
            </div>
            {/* card 2: bio, categories, keywords etc */}
            <div className="card prf-infobox">
              <div className="card-body">
                <div className="list-group">
                  <ListCaptionWidget captionText={this.state.username}/>
                  <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h3 className="mb-1">About me</h3>
                    </div>
                    <div>{this.state.bio}</div>
                    <div>
                      { (this.state.updatingBio)
                      ? (
                          <div className="card-body">
                              <form className='prf-update-form'>
                                  <div className="form-group">
                                      <textarea
                                      placeholder='Update your Bio...'
                                      className='form-control'
                                      value={ this.state.bio }
                                      onChange={ this.onBioChange } />
                                  </div>
                                  <div className='btn-toolbar'>
                                      <button type='button' value='cancel' className='btn btn-secondary' onClick={ this.resetBio }>Cancel</button>
                                      <button type='button' value='submit' className='btn btn-primary' onClick={ this.triggerUpdateBio }>Update</button>
                                  </div>
                              </form>
                          </div>
                      )
                      : null}
                    </div>
                    {(this.props.ownerIsViewer)?
                    <div>
                      <button type="button" className="btn btn-sm" onClick={this.beginBioEdits}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    </div>
                    : null}
                  </div>
                  <ListItemWidget title='Links' content={urls} editBtnName={(this.props.ownerIsViewer)? 'Edit':null} />
                  <ListItemWidget title='My craft' content={categories} editBtnName={(this.props.ownerIsViewer)? 'Edit':null} />
                  <ListItemWidget title='Favorite tags' content={categories} editBtnName={(this.props.ownerIsViewer)? 'Edit':null} />
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          {/* ################# user's media content #################### */}
          <div className="prf-mediabox ">
            <div className="card prf-mediabox-item">
              <div className="card-body">
                <div className="card-text prf-mediabox-content">
                  <h1>Tile 1</h1>
                  <p>Can hold photo|video widget|audio widget</p>
                  <p>video + sound externally hosted for now (e.g. via user's youtube, soundcloud)</p>
                </div>
              </div>
            </div>
            <div className="card prf-mediabox-item">
              <div className="card-body">
                <div className="card-text prf-mediabox-content">
                  <h1>Tile 2</h1>
                  <p>Can hold photo|video widget|audio widget</p>
                  <p>video + sound externally hosted for now (e.g. via user's youtube, soundcloud)</p>
                </div>
              </div>
            </div>
            <div className="card prf-mediabox-item">
              <div className="card-body">
                <div className="card-text prf-mediabox-content">
                  <h1>Tile 3</h1>
                  <p>Can hold photo|video widget|audio widget</p>
                  <p>video + sound externally hosted for now (e.g. via user's youtube, soundcloud)</p>
                </div>
              </div>
            </div>
            <div className="card prf-mediabox-item">
              <div className="card-body">
                <div className="card-text prf-mediabox-content">
                  <h1>Tile 4</h1>
                  <p>Can hold photo|video widget|audio widget</p>
                  <p>video + sound externally hosted for now (e.g. via user's youtube, soundcloud)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}