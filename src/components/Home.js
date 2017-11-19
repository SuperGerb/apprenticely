import React, { Component } from 'react';
import Navigation from './Navigation';
import ClassifiedAdsList from './ClassifiedAdsList';
import CreateClassifiedAdButton from './CreateClassifiedAdButton';

const Home = (props) => (
  <div>
  <section className="appr-bgimage">
    <div className="row appr-hero">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 className="appr-hero-caption">Planning & Strategy for Creatives & Crafters</h3>
        <p className="appr-hero-copy">We're your kind of people.</p>
        <p><a href="#" className="btn btn-primary btn-large">Learn more »</a></p>
      </div>
    </div>
  </section>

  <section className="appr-main">
    <div>
        <ClassifiedAdsList />
        <CreateClassifiedAdButton />
    </div>
  </section>
  </div>
);

export default Home;

