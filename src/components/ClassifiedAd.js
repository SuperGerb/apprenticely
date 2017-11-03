import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ClassifiedAd = (props) => {
    const { adDetails } = props;
    //Equivalent to const adDetails = props.adDetails;
    const { classifiedId, title, description, location, category, type, image, userId, status} = adDetails;
    const detailViewUrl = "/classfiedDetailView?adId=" + classifiedId;

    return (
        <div className="card text-center" >
            <img className="card-img-top" src="http://via.placeholder.com/350x150" alt="Image caption" />
            <div className="card-block">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{description}</p>
                <Link to={detailViewUrl} className="btn btn-primary">Go somewhere</Link>
            </div>
            <div className="card-footer text-muted">2 days ago</div>
        </div >
    )
}

export default ClassifiedAd;