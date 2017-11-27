import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import Lightbox from 'react-images';
import ImageGallery from './ImageGallery';
import AdInquiryForm from './AdInquiryForm';
import { calculateTimeElapsed } from '../app/utilities/ad-formatting.js';

class ClassifiedDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      currentAd: {}
    }
  }

  componentDidMount() {
    const scope = this;
    //Extract the query string from the url:
    const currentAdId = this.props.history.location.search;
    //Pass the query string in the http request along with the route:
    const currentAdUrl = '/displayDetailViewClassifiedAd' + currentAdId;

    fetch(currentAdUrl, {
      method: 'get'
    }).then(function (response) {
      if (response.status !== 200) {
        console.log("Problem fetching in the ClassifiedDetailView component");
      } else {
        return response.json();
      }
    }).then(function (data) {
      scope.setState({
        currentAd: data
      });
    }).catch(function (err) {
      console.log("The following error occured in the Fetch of the ClassifiedDetailView component: ", err);
    });
  }

  displayAdInquiryForm = (event) => {
    this.setState({ submitted: true }, () => {
      this.scrollToForm();
    });
  }

  scrollToForm() {
    let distance = $('.ad-inquiry-card').offset().top - 60;
    $('html,body').animate({ scrollTop: distance }, 600);
  }

  render() {
    const { currentAd } = this.state;
    //Equivalent to const currentAd = this.state.currentAd;
    const { title, description, datePosted, location, category, type, images } = currentAd;

    //Convert the datePosted string from the database back into a js Date object: 
    const dateAdWasPosted = new Date(datePosted);
    const todaysDate = new Date();
    let timeElapsedSincePosted = calculateTimeElapsed(dateAdWasPosted, todaysDate);

    //Format the images: 
    const baseImageUrl = "/images/classifiedImageUploads/";
    let imageArray;
    let firstImageSrc;
    if (images) {
      if (images.length == 0) {
        imageArray = [];
        return;
      }
      firstImageSrc = baseImageUrl + images[0].imgFilename;
      imageArray = images.map(function (obj, index) {
        let imgSrc = baseImageUrl + obj.imgFilename;
        if (index !== 0) {
          return (
            <div className="col-sm-12 side-image-item" key={index}>
              <img className="card-img-side" src={imgSrc} alt="Image caption" />
            </div>
          )
        }
        //Or, if using the react-images (ImageGallery) module, return an array of objects with src keys, ex: [{src: imageSrc}, {src: imageSrc1}, {src: imageSrc2}]
      });
    }

    return (
      <div>
        <div className="col-sm-8 offset-sm-2 classified-detail-view" >
          <div className="card text-center">
            {/* Implemenent if using react-images module. Needs debugging. <ImageGallery images = {imageArray} showThumbnails = {true} /> */}
            <div className="row classified-ads-image-gallery">
              <div className="col-sm-9 main-image-zone">
                <img src={firstImageSrc} alt="Image caption" />
              </div>
              <div className="col-sm-3 side-image-zone">
                <div className="row">
                  {imageArray}
                </div>
              </div>
            </div>
            <div className="card-block">
              <h4 className="card-title">{title}</h4>
              <p className="card-text">{description}</p>
              <button className="btn btn-primary" onClick={this.displayAdInquiryForm}>Respond to this ad</button>
            </div>
            <div className="card-footer text-muted">Posted {timeElapsedSincePosted}</div>
          </div >
        </div >
        {this.state.submitted ? <AdInquiryForm /> : null}
      </div>
    )
  }
}

export default ClassifiedDetailView;