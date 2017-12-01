import React, { Component } from 'react';
//import { Route, Switch, Link } from 'react-router-dom';
import PrfImageLoader from './PrfImageLoader';
import PrfWidgetBio from './PrfWidgetBio';
import PrfWidgetAvatar from './PrfWidgetAvatar';
import PrfWidgetFollows from './PrfWidgetFollows';
import PrfWidgetLinks from './PrfWidgetLinks';
import ClassifiedAdMicro from '../../ClassifiedAdMicro';

const ListItemWidget = ({ title, content, editBtnName, editBtnHandler }) => (
  <div className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h3 className="mb-1">{title}</h3>
    </div>
    <div>{content}</div>
    {(editBtnName) ?
      <div>
        <button type="button" className="btn btn-sm" onClick={editBtnHandler}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      </div>
      : null}
  </div>
);

const ListCaptionWidget = ({ captionText }) => (
  <div className="list-group-item list-group-item-action flex-column align-items-start active">
    <div className="d-flex w-100 justify-content-between">
      <h2 className="mb-1">{captionText}</h2>
    </div>
  </div>
);

export default class PrfProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'profileDetailAbout'
    };
  }

  // componentDidMount = () => {
  //   $('#divID').css("background-image", "url(/myimage.jpg)");
  // }


  render() {
    // let folksonomyTerms = this.props.user.hasOwnProperty("folkterms") ? this.props.user.keywords : [];

    //build content snippets
    // let categories = categoryList.map( (catlabel) => {
    //   return (<button type="button" className="btn btn-primary btn-sm"> {catlabel} </button>);
    // });

    // let fterms = folksonomyTerms.map( (label) => {
    //   //note: taxonomic terms aren't handled by the user and don't need to be surfaced in the  UI atm.
    //   return (<button type="button" className="btn btn-primary btn-sm"> {label} </button>);
    // });

    //%%%%%%%%%%%%%% ABOUT Tab %%%%%%%%%%%%%%%%
    let bioFragment = { _id: this.props.user._id, bio: this.props.user.bio };

    let avatarSrc = this.props.user.hasOwnProperty("avatarSrc") ? this.props.user.avatarSrc : null;
    let avatarFragment = { _id: this.props.user._id, avatarSrc: avatarSrc };

    let ownerFollowersList = this.props.user.hasOwnProperty("followers") ? this.props.user.followers : [];
    let ownerfollowingList = this.props.user.hasOwnProperty("following") ? this.props.user.following : [];
    let viewerFollowingList = this.props.viewer.hasOwnProperty("following") ? this.props.viewer.following : [];
    let ownerFragment = { _id: this.props.user._id, username: this.props.user.username, followers: ownerFollowersList, following: ownerfollowingList };
    let viewerFragment = { _id: this.props.viewer._id, username: this.props.viewer.username, following: viewerFollowingList };

    let linkList = this.props.user.hasOwnProperty("links") ? this.props.user.links : '';
    let linksFragment = { _id: this.props.user._id, links: linkList };

    //%%%%%%%%%%%%%% Needs Tab %%%%%%%%%%%%%%%%

    // DUMMY DATA temporarily
    let ads = [
      {
        _id: "5a205d582093190e24ed2340",
        classifiedId: "252235ca-4c5d-43a1-8976-f04621c8b9af",
        title: "The curse of the Raku Pot",
        description: "sfkd ;sldjf ;ldfj a;sldfasdfjsd lfkdrm aldkfj adfsifj a dfadsf",
        location: "bavaria",
        category: "Fine Art (Drawing, Painting, Sculpture, Printmaking)",
        type: "wanted",
        userId: "5a15a4297212040a608efdc1",
        status: "open",
        datePosted: "Thu Nov 30 2017 14:34:48 GMT-0500 (Eastern Standard Time)",
        images: [
          {
            "imgName": "image0",
            "imgFilename": "94b38624-167a-4c35-a3ab-2356bd40abf0.jpg"
          }
        ]
      },
      {
        _id: "5a15ee09c558795bc4bb21be",
        classifiedId: "0fed3c40-bf2c-47c6-bd9a-8872a4dae77c",
        title: "Artist (hand-painting, car airbrush, murals, etc.)",
        description: "Hello everyone! I'm graduated artist, working in the field of commercial art. If you are looking for something exclusive: such as hand-painting on canvas, car airbrush, murals, illustration or have an idea that you'd like to see come to life ... I can make it happen! Feel free to contact me for any questions. I am willing to give my service. Prices on all projects are negotiable! \r\nSERVICE:- Exclusive hand-painting on the canvas\r\n- Portrait from Photo- decoration Art / Interior Painting (wall)\r\n- Car/Helmet Painting (airbrush)\r\n- Illustration \r\n\r\nThank you and hoping to work with you!",
        location: "Montreal",
        category: "Fine Art (Drawing, Painting, Sculpture, Printmaking)",
        type: "offered",
        userId: "123",
        status: "open",
        datePosted: "Wed Nov 22 2017 16:37:13 GMT-0500 (EST)",
        images: [
          {
            "imgName": "image0",
            "imgFilename": "668b21b9-169b-4377-b8a7-3d6b589cb37a.JPG"
          },
          {
            "imgName": "image1",
            "imgFilename": "50fd5645-5204-4930-990b-60461020670e.JPG"
          },
          {
            "imgName": "image2",
            "imgFilename": "5d9c9d9b-3fed-4908-aceb-1037fa97d4d0.JPG"
          }
        ]
      }
    ];

    let wanteds = ads.filter(ad => ad.type == "wanted").map((ad) => {
      return (<ClassifiedAdMicro adDetails={ad} />);
    });

    let offereds = ads.filter(ad => ad.type == "offered").map((ad) => {
      return (<ClassifiedAdMicro adDetails={ad} />);
    });

    return (
      <div className="card-group prf-details">
        {/* card 1: user avatar and links */}
        <div className="card prf-vcard prf-infobox">
          <div className="card-body">
            <ListCaptionWidget captionText={this.props.user.username} />
            <PrfWidgetAvatar userFragment={avatarFragment} editable={this.props.ownerIsViewer} />
            <PrfWidgetFollows profileOwnerFragment={ownerFragment} profileViewerFragment={viewerFragment} editable={this.props.ownerIsViewer} />
          </div>
        </div>
        {/* card 2: bio, categories, keywords etc */}
        <div className="card prf-stretchbox prf-infobox">
          <div className="card-body">
            <ul className="nav nav-tabs" id="profileDetailTabset" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="profileDetailAbout" href="#aboutContent" data-toggle="tab" role="tab" aria-controls="about" aria-selected="true">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profileDetailNeeds" href="#needsContent" data-toggle="tab" role="tab" aria-controls="needs" aria-selected="false">Needs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profileDetailOffers" href="#offersContent" data-toggle="tab" role="tab" aria-controls="offers" aria-selected="false">Offers</a>
              </li>
            </ul>
            <div className="tab-content" id="profileDetailContent">
              <div className="tab-pane show active" id="aboutContent" role="tabpanel" aria-labelledby="profileDetailAbout">
                <div className="card prf-infobox">
                  <div className="card-body">
                    <div className="list-group">
                      <PrfWidgetBio userFragment={bioFragment} editable={this.props.ownerIsViewer} />
                      <PrfWidgetLinks userFragment={linksFragment} editable={this.props.ownerIsViewer} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="needsContent" role="tabpanel" aria-labelledby="profileDetailNeeds">
                <div className="card prf-infobox">
                  <div className="card-body">
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                      <p className="appr-prompt wanted"><b>{this.props.user.username}</b> is on the lookout for a few things. Maybe you can lend a hand?</p>
                      <div>
                        {wanteds}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="offersContent" role="tabpanel" aria-labelledby="profileDetailOffers">
                <div className="card prf-infobox">
                  <div className="card-body">
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                      <p className="appr-prompt offered"><b>{this.props.user.username}</b> has a few things to offer!</p>
                      <div>
                        {offereds}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}