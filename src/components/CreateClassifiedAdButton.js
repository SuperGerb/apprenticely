import React, { Component } from 'react';
import ClassifiedAdForm from './ClassifiedAdForm';
import {Link} from 'react-router-dom';

const CreateClassifiedAdButton = (props) =>(
    <Link to="/createClassifiedAd" className="btn btn-primary accented button-create-a-classified-ad" >
      Post an ad!&nbsp;
      <i className="fa fa-bullhorn fa-lg" aria-hidden="true"></i>
    </Link> 
)

export default CreateClassifiedAdButton;