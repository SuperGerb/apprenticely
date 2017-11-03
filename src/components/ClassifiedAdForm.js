import React, { Component } from 'react';
import AdCreatedConfirmation from './AdCreatedConfirmation';
import uuid from 'uuid';
const uuidv4 = require('uuid/v4');

//To do: make location a select
//To do: deal with file upload (the image)
//Link to actual userId

class ClassifiedAdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            classifiedId: "",
            title: "",
            description: "",
            location: "",
            category: "",
            type: "",
            image: "",
            userId: "",
            status: "",
            datePosted: "",
            currentAd: {}
        }
    }

    handleChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmitNewAd = (event) => {
        event.preventDefault();
        const scope = this;
        //Set the default values for the selects, if unchanged:
        let type = this.state.type !== "" ? this.state.type : this.state.type = "offered";

        let category = this.state.category !== "" ? this.state.category : this.state.category = "music";

        let currentDate = new Date();

        let currentClassifiedAd = {
            classifiedId: uuidv4(),
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            category: this.state.category,
            type: this.state.type,
            image: this.state.image,
            userId: "123",
            status: "open",
            datePosted: currentDate
        }

        //Save the current ad to state:
        this.state.currentAd = currentClassifiedAd;

        fetch('/adCreatedConfirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.currentAd)
        }).then(function (response) {
            return response.json();
        }).then(function () {
            //Set submitted to true and clear the currentAd object to make way for the next form submission:
            scope.setState({
                submitted: true,
                currentAd: {}
                //If necessary, clear the form inputs:
                // classifiedId: "",
                // title: "",
                // description: "",
                // location: "",
                // category: "",
                // type: "",
                // image: "",
                // userId: "",
                // status: "",
            });
        });
    }

    render() {
        if (this.state.submitted == true) {
            return <AdCreatedConfirmation />
        } else {
            return (
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-block">
                            <h2>Create a classified ad</h2>
                            <form id="addClassifiedAdForm" name="addClassifiedAdForm">
                                <input type="hidden" value={this.state.classifiedId} className="form-control" id="classifiedId" name="classifiedId" />
                                <label htmlFor="title">Title</label>
                                <div className="input-group">
                                    <input type="text" value={this.state.title} className="form-control" id="title" name="title" placeholder="Title of the ad..." aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                                </div>
                                <br />
                                <label htmlFor="description">Description</label>
                                <div className="input-group">
                                    <textarea value={this.state.description} className="form-control" id="description" name="description" aria-describedby="basic-addon1" onChange={this.handleChangeInput}></textarea>
                                </div>
                                <br />
                                <label htmlFor="location">Location</label>
                                <div className="input-group">
                                    <input type="text" value={this.state.location} className="form-control" id="location" name="location" aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                                </div>
                                <br />
                                <label htmlFor="type">Type</label>
                                <div className="input-group">
                                    <select id="type" name="type" onChange={this.handleChangeInput} >
                                        <option value="offered">Offered</option>
                                        <option value="wanted">Wanted</option>
                                    </select>
                                </div>
                                <br />
                                <label htmlFor="category">Category</label>
                                <div className="input-group">
                                    <select id="category" name="category" onChange={this.handleChangeInput} >
                                        <option value="music">Music</option>
                                        <option value="writing">Writing</option>
                                        <option value="photography">Photography</option>
                                        <option value="video">Video</option>
                                        <option value="fineArt">Fine Art (Drawing, Painting, Sculpture, Printmaking)</option>
                                        <option value="acting">Acting</option>
                                        <option value="textiles">Textiles</option>
                                        <option value="woodcraft">Woodcraft</option>
                                        <option value="papercraft">Papercraft</option>
                                        <option value="metalwork">Metalwork</option>
                                        <option value="potteryAndGlass">Pottery and Glass</option>
                                        <option value="jewellery">Jewellery</option>
                                        <option value="maker">Maker (Electronics, Digital printing, Laser cutting)</option>
                                        <option value="mixedMedia">Mixed Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <br />
                                <input type="hidden" value={this.state.userId} className="form-control" id="userId" name="userId" />
                                <input type="hidden" value={this.state.status} className="form-control" id="status" name="status" />
                                <label htmlFor="image" className="custom-file-label">Upload an image</label>
                                <div className="custom-file">
                                    <input type="file" id="image" name="image" className="custom-file-input" />
                                    <span className="custom-file-control"></span>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary" id="addClassifiedAd" onClick={this.handleSubmitNewAd}>Create ad</button>
                            </form>
                        </div>
                    </div >
                </div >
            )
        }
    }
}

export default ClassifiedAdForm;