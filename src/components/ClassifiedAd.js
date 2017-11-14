import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ClassifiedAd = (props) => {
    const { adDetails } = props;
    //Equivalent to const adDetails = props.adDetails;
    const { classifiedId, title, description, location, category, type, images, userId, status, datePosted } = adDetails;
    const detailViewUrl = "/classfiedDetailView?adId=" + classifiedId;
    const imageSrc = "/images/classifiedImageUploads/" + images;
    //Convert the datePosted string from the database back into a js Date object: 
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
            } else if(differenceInHours === 1){
                return differenceInHours + " hour ago";
            }else{
                return differenceInHours + " hours ago";
            }
        } else if(differenceInDays === 1){
            return differenceInDays + " day ago";
        }else{
            return differenceInDays + " days ago";
        }
    }

    //Truncate the description ensuring to not place ellipsis in the middle of a word or after a punctuation symbol:
    function truncateDescription(text, limit) {
        const endOfSentence = /[\.\?\!]/;
        const otherPunctuationMarks = /[\,\;\:]/;

        if (text.length > limit) {
            for (let i = limit; i > 0; i--) {
                if (text.charAt(i) === " ") {
                    if (otherPunctuationMarks.test(text.charAt(i - 1) === true)) {
                        return text.slice(0, i - 1) + "...";
                    } else if (endOfSentence.test(text.charAt(i - 1)) === false) {
                        return text.slice(0, i) + "...";
                    }
                }
            }
        }
    }

    let timeElapsedSincePosted = calculateTimeElapsed(dateAdWasPosted, todaysDate);

    let shortDesc = truncateDescription(description, 110);

    return (
        <div className="card text-center" >
            <img className="card-img-top" src={imageSrc} alt="Image caption" />
            <div className="card-block">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{shortDesc}</p>
                <Link to={detailViewUrl} className="btn btn-primary">More info</Link>
            </div>
            <div className="card-footer text-muted">{timeElapsedSincePosted}</div>
        </div >
    )
}

export default ClassifiedAd;