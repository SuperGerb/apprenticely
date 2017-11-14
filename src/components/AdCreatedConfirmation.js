import React, { Component } from 'react';
import ClassifiedAdForm from './ClassifiedAdForm';
import {Link} from 'react-router-dom';

//To do: needs to be passed props to display the title, if desired:

const AdCreatedConfirmation = (props) => (
    <div>
        <h2>{props.title} Ad successfully created!</h2>
    </div>
)

export default AdCreatedConfirmation;