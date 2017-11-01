import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClassifiedDetailView extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentAd: {}
        }
    }

    componentDidMount() {
        const scope = this;
        const currentAdId = this.props.match.params.adId;
        const currentAdUrl = '/displayDetailViewClassifiedAd/?id=' + currentAdId;

        fetch(currentAdUrl, {
            method: 'get'
        }).then(function (response) {
            if (response.status !== 200) {
                console.log("Problem fetching in the ClassifiedDetailView component");
            } else {
                return response.json();
            }
        }).then(function (data) {
            console.log("Fetch in the ClassifiedDetailView component worked.");
            scope.setState({
                currentAd: data
            });
        }).catch(function (err) {
            console.log("The following error occured in the Fetch of the ClassifiedDetailView component: ", err);
        });
    }

    render() {
        return (
            <div className= "col-sm-8 offset-sm-2" >
                <div className="card text-center">
                    <img className="card-img-top" src="http://via.placeholder.com/700x300" alt="Image caption" />
                    <div className="card-block">
                        <h4 className="card-title">{this.state.currentAd.title}</h4>
                        <p className="card-text">{this.state.currentAd.description}</p>
                        <p className="card-text">And a lot more detail.</p>
                        <Link to="/respondToAd" className="btn btn-primary">Respond to this ad</Link>
                    </div>
                    <div className="card-footer text-muted">2 days ago</div>
                </div>
            </div >
        )
    }
}

export default ClassifiedDetailView;