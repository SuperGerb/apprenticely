import React, { Component } from 'react';
import ClassifiedAd from './ClassifiedAd';

const classNameifiedAdsList = (props) => (
    <ul className="row classified-list">
        <li className="col-xs-6 col-sm-4">
            <ClassifiedAd />
        </li>
    </ul>
)

export default classNameifiedAdsList;