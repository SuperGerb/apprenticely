//PrfHorizontalSummary.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PrfBaseProfile from '../detail/PrfBaseProfile';

export default class PrfHorizontalSummary extends PrfBaseProfile {
  constructor(props) {
    super(props);   
  }

  render =()=>{
    return (
      <div className="card prf-hcard">
        <div className='d-flex justify-content-start'>
            <img className="card-img-left prf-avatar" src={this.state.avatarSrc}/>
            <div className="card-body d-flex flex-column">
                <h4 className="card-title"><Link to={`/user/${this.state.username}`}>{this.state.username}</Link></h4>
                <p className="card-text">{this.state.bio}</p>
            </div>
        </div>
      </div>
    )
  }
}
