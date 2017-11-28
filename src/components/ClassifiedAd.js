import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeElapsed, truncateCopy } from "../app/utilities/ad-formatting.js";

const ClassifiedAd = (props) => {
    const { adDetails } = props;
    //Equivalent to const adDetails = props.adDetails;
    const { classifiedId, title, description, location, category, type, images, userId, status, datePosted } = adDetails;
    const detailViewUrl = "/classfiedDetailView?adId=" + classifiedId;
    let imageSrc = "";
    //Get the filename of the first image, in order to display it: 
    if (images) {
        imageSrc = (images.length > 0) ? "/images/classifiedImageUploads/" + images[0].imgFilename : "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    }

    //Convert the datePosted string from the database back into a js Date object: 
    const dateAdWasPosted = new Date(datePosted); 
    const todaysDate = new Date();
    let timeElapsedSincePosted = calculateTimeElapsed(dateAdWasPosted, todaysDate);

    //Truncate the description ensuring to not place ellipsis in the middle of a word or after a punctuation symbol:
    let shortDesc = truncateCopy(description, 20);

    return (
        <div className="card text-center ad-card" >
            <Link to={detailViewUrl}>
                <div className="ad-card-img-wrap">
                    <img className="card-img-top" src={imageSrc} alt="Image caption" />
                </div>
            </Link>
            <div className="card-block">
                <Link to={detailViewUrl}><h4 className="card-title ad-card-title">{title}</h4></Link>
            </div>
            <Link to={detailViewUrl}><div className="card-footer text-muted">{timeElapsedSincePosted}</div></Link>
        </div >
    )
}

export default ClassifiedAd;