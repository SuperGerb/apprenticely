//PrfVerticalSummary.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PrfBaseProfile from '../detail/PrfBaseProfile';

export default class PrfVerticalSummary extends PrfBaseProfile {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="card prf-vcard">
        <img className="card-img-top prf-avatar" src={this.state.avatarSrc}/>
        <div className="card-body">
          <h4 className="card-title"><Link to={`/user/${this.state.username}`}>{this.state.username}</Link></h4>
          <p className="card-text">{this.state.bio}</p>
        </div>
        <div className="card-footer">
        Artist
        </div>
      </div>
    )
  }
}
