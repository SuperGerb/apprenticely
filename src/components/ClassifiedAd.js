import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ClassifiedAd = (props) => (
    <div className="card text-center">
        <img className="card-img-top" src="http://via.placeholder.com/350x150" alt="Image caption" />
        <div className="card-block">
            <h4 className="card-title">Title</h4>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Link to="/classfiedDetailView/musicLessons" className="btn btn-primary">Go somewhere</Link>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
    </div>
)

export default ClassifiedAd;