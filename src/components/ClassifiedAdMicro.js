import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeElapsed, truncateCopy } from "../app/utilities/ad-formatting.js";
import JSClientUtils from '../utils/js-client-utils.js';

const ClassifiedAdMicro = (props) => {
    const { adDetails } = props;
    const { classifiedId, title, description, location, category, type, images, userId, status, datePosted } = adDetails;
    const detailViewUrl = "/classfiedDetailView?adId=" + classifiedId;
    let imageSrc = "";
    //Get the filename of the first image, in order to display it: 
    if (images) {
        imageSrc = (images.length>0) ? "/images/classifiedImageUploads/" + images[0].imgFilename : "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    }

    //Convert the datePosted string from the database back into a js Date object: 
    const dateAdWasPosted = new Date(datePosted);
    const todaysDate = new Date();
    let timeElapsedSincePosted = calculateTimeElapsed(dateAdWasPosted, todaysDate);

    //Truncate the description ensuring to not place ellipsis in the middle of a word or after a punctuation symbol:
    let shortDesc = truncateCopy(description, 70);

    return (
      <div className="card" >
        <div className='appr-microlist-flexer'>
          <Link to={detailViewUrl}>
              <div className="appr-microlist-thumbnail" style={ {background: `url(${imageSrc}) no-repeat center`} }>&nbsp;</div>
          </Link>
          <div className="card-block">
              <Link to={detailViewUrl}><p className="card-title">{title}</p></Link>
              <Link to={detailViewUrl}><small className="card-text">{shortDesc}</small></Link>
          </div>
        </div>
      </div >
    );
}

export default ClassifiedAdMicro;