import React, { Component } from 'react';
import ClassifiedAd from './ClassifiedAd';
//import ClassifiedAdMicro from './ClassifiedAdMicro';
import { Link } from 'react-router-dom';
import ClassifiedDetailView from './ClassifiedDetailView';

class ClassifiedAdsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAds: []
        }
    }

    componentDidMount() {
        const scope = this;

        fetch('/classifiedsListView', {
            method: 'get'
        }).then(function (response) {
            if (response.status !== 200) {
                console.log("Problem fetching in the ClassifiedAdsList component");
            } else {
                return response.json();
            }
        }).then(function (data) {
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
                <li key={index} className="col-xs-6 col-sm-3">
                    {/* <ClassifiedAdMicro adDetails = {value} /> */}
                    <ClassifiedAd adDetails = {value} />
                </li>
            )
        });

        return(
            // <ul className="row classified-list appr-microlist">
             <ul className="row classified-list">
               {ads}
            </ul>
        )
    }
}

export default ClassifiedAdsList;