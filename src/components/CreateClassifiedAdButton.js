import React, { Component } from 'react';
import ClassifiedAdForm from './ClassifiedAdForm';
import {Link} from 'react-router-dom';

const CreateClassifiedAdButton = (props) =>(
    <Link to="/createClassifiedAd" className="btn btn-primary button-create-a-classified-ad">Create a classified ad</Link> 
)

export default CreateClassifiedAdButton;