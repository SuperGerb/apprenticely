import React, { Component } from 'react';
import ClassifiedAdForm from './ClassifiedAdForm';
import {Link} from 'react-router-dom';

//To do: needs to be passed props to display the title, if desired:

const AdCreatedConfirmation = (props) => (
    <div>
        <h1>{props.title} Ad successfully created!</h1>
        {/* Not working yet: */}
        {/* <Link to="/createClassifiedAd" className="btn btn-primary">Create another classified ad</Link> */}
    </div>
)

export default AdCreatedConfirmation;