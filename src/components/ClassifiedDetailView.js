import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ClassifiedDetailView = (props) =>(
    <div className="col-sm-8 offset-sm-2">
        <div className="card text-center">
            <img className="card-img-top" src="http://via.placeholder.com/700x300" alt="Image caption" />
            <div className="card-block">
                <h4 className="card-title">Title</h4>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <p className="card-text">And a lot more detail.</p>
                <Link to="/respondToAd" className="btn btn-primary">Respond to this ad</Link>
            </div>
            <div className="card-footer text-muted">2 days ago</div>
        </div>
    </div>
)

export default ClassifiedDetailView;