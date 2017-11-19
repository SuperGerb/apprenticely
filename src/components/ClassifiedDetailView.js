import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Lightbox from 'react-images';
import ImageGallery from './ImageGallery';

class ClassifiedDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        const { currentAd } = this.state;
        //Equivalent to const currentAd = this.state.currentAd;
        const { title, description, datePosted, location, category, type, images } = currentAd;

        //Convert the datePosted string back into a js Date object: 
        const dateAdWasPosted = new Date(datePosted);
        const todaysDate = new Date();

        //Calculate the time elapsed since the ad was posted:
        function calculateTimeElapsed(dateAdWasPosted, todaysDate) {
            //Get 1 day in milliseconds:
            const oneDay = 1000 * 60 * 60 * 24;
            let datePosted_ms = dateAdWasPosted.getTime();
            let todaysDate_ms = todaysDate.getTime();
            let difference_ms = todaysDate_ms - datePosted_ms;
            let differenceInDays = Math.round(difference_ms / oneDay);
            if (differenceInDays < 1) {
                //Get 1 hour in milliseconds:
                const oneHour = 1000 * 60 * 60;
                let differenceInHours = Math.round(difference_ms / oneHour);
                if (differenceInHours < 1) {
                    return "Less than 1 hour ago";
                } else if (differenceInHours === 1) {
                    return differenceInHours + " hour ago";
                } else {
                    return differenceInHours + " hours ago";
                }
            } else if (differenceInDays === 1) {
                return differenceInDays + " day ago";
            } else {
                return differenceInDays + " days ago";
            }
        }

        let timeElapsedSincePosted = calculateTimeElapsed(dateAdWasPosted, todaysDate);

        //Format the images: 
        const baseImageUrl = "/images/classifiedImageUploads/";
        let imageArray;
        let firstImageSrc;
        if (images) {
          if(images.length == 0){
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
            <div className="col-sm-8 offset-sm-2" >
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
                        <Link to="/respondToAd" className="btn btn-primary">Respond to this ad</Link>
                    </div>
                    <div className="card-footer text-muted">{timeElapsedSincePosted}</div>
                </div >
            </div >
        )
    }
}

export default ClassifiedDetailView;