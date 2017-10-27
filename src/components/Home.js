import React, { Component } from 'react';
import Navigation from './Navigation';
import ClassifiedAdsList from './ClassifiedAdsList';
import CreateClassifiedAdButton from './CreateClassifiedAdButton';

const Home = (props) => (
    <div>
        <ClassifiedAdsList />
        <CreateClassifiedAdButton />
    </div>
)

export default Home;

