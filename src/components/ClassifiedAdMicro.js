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
    let shortDesc = truncateCopy(description, 100);
    let cssString = (type == "wanted") ? "fa fa-hand-paper-o fa-2x wanted" : "fa fa-hand-o-right fa-2x offered";

  return (
    <div className="card appr-horiz-ad">
      {/* ad images will not work until a cdn solution is in place */}
      {/*<div className="card-img-left" style={ {backgroundImage: `url(${imageSrc})`} }/> */}
      <i className={cssString} aria-hidden="true"></i>
      <div className="card-body d-flex flex-column">
          <h3 className="card-title"><Link to={detailViewUrl}>{title}</Link></h3>
          <p className="card-text">{shortDesc}</p>
          <small><i>{timeElapsedSincePosted}</i></small>
      </div>    
    </div>
  );
}

export default ClassifiedAdMicro;