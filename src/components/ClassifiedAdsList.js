import React, { Component } from 'react';
import ClassifiedAd from './ClassifiedAd';
import { Link } from 'react-router-dom';

class ClassifiedAdsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfAds: []
        }
    }

    componentDidMount() {
        console.log("Mounted");
        const scope = this;

        fetch('/display', {
            method: 'get'
        }).then(function (response) {
            if (response.status !== 200) {
                console.log("Problem fetching in the ClassifiedAdsList component");
            } else {
                return response.json();
            }
        }).then(function (data) {
            console.log("Fetch in the ClassifiedAdsList component worked.");
            scope.setState({
                listOfAds: data
            });
        }).catch(function (err) {
            console.log("The following error occured in the Fetch of the ClassifiedAdsList component: ", err);
        });
    }

    render() {
        const ads = this.state.listOfAds.map(function(value,index){
            return(
                <li key={index} className="col-xs-6 col-sm-4">
                    <ClassifiedAd adDetails = {value} />
                </li>
            )
        });

        return(
            <ul className="row classified-list">
               {ads}
            </ul>
        )
    }
}

export default ClassifiedAdsList;