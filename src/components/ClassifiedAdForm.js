import React, { Component } from 'react';
import AdCreatedConfirmation from './AdCreatedConfirmation';
import Home from './Home';
import ClassifiedDetailView from './ClassifiedDetailView';
import { Redirect, BrowserRouter, history } from 'react-router-dom';
import { makeDroppable } from "../app/utilities/drag-and-drop.js";
import uuid from 'uuid';
const uuidv4 = require('uuid/v4');

//To do: make location a select
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
            categories: [],
            type: "",
            images: [],
            previewImage: "",
            userId: "",
            status: "",
            datePosted: "",
            currentAd: {}
        }
    }

    componentDidMount() {
        const scope = this;
        //Fill the category select with the options from the taxonomy.json file on the server:
        fetch('/accessTaxonomy', {
            method: 'get'
        }).then(function (response) {
            if (response.status !== 200) {
                console.log("Problem fetching the taxonomy in the ClassifiedAdForm component");
            } else {
                return response.json();
            }
        }).then(function (taxonomyObject) {
            let classifiedCategories = [];
            for (let key in taxonomyObject.categories) {
                let categoryName = taxonomyObject.categories[key].uiLabel;
                classifiedCategories.push(categoryName);
            }
            scope.setState({
                categories: classifiedCategories
            });
        }).catch(function (err) {
            console.log("Error in componentDidMount of ClassifiedAdForm: ", err);
        });

        //Create the drag and drop zone for the image uploads:
        let dropZone = document.getElementById("file-drop-zone");
        makeDroppable(dropZone, 'classifiedAdFileInput', addUploadedFilesToState);

        //Enable for showing a preview of an image in the browser: (1/2):
        //const imageInput = document.getElementById("classifiedAdFileInput");

        //Callback for when files are dropped on the drag and drop zone:
        function addUploadedFilesToState(files) {
            scope.setState({
                images: files
            });
            //Enable for showing a preview of an image in the browser: (2/2):
            /*//For testing with one image: shows a preview of the image in the browser:
            //To do: Could extend this to preview multiple images. Also improve add in the reject (if no files uploaded, etc). 
            let previewUrl = "";
            let getDataUrlOfUploadedImage = new Promise((resolve, reject) => {
                //This is just going to get the last image that was added via the file selector window (ie clicking in the drop zone):
                if (files && files[0]) {
                    //console.log("imageInput.files= ", files);
                    let reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = function (e) {
                        //console.log("e.target.result= ", e.target.result);
                        resolve(previewUrl = e.target.result);
                    };
                }
            }).then((urlForImagePreview) => {
                scope.setState({
                    images: files,
                    previewImage: previewUrl
                });
                console.log("In state, the files are: ", scope.state.images);
                console.log("In state, the preview image is: ", scope.state.previewImage);
            });*/
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
            images: this.state.images,
            userId: "123",
            status: "open",
            datePosted: currentDate
        }

        //Save the current ad to state:
        this.state.currentAd = currentClassifiedAd;

        //Encoding the data as multipart/form-data:
        const formData = new FormData();

        Object.keys(currentClassifiedAd).forEach((key) => {
            //Loop through the image array and if it contains files, then extract them and add them individually to the formData object, along with the information necessary for the server to identify them as image files (ie. the name property):
            if (key === "images") {
                let images = currentClassifiedAd[key];
                let numberOfImages = currentClassifiedAd[key].length;
                for (let i = 0; i < numberOfImages; i++) {
                    if (images[i] instanceof File) {
                        formData.append("images", images[i], images[i].name);
                    }
                }
                //Append all the other form field key, value pairs to the formData object:
            } else {
                formData.append(key, currentClassifiedAd[key])
            }
        });
 
        // For testing:
        // console.log("Contents of FormData: ");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        fetch('/adCreatedConfirmation', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            //return response.json();
        }).then(function () {
            //Set submitted to true:
            scope.setState({
                submitted: true
            });
        });
    }

    render() {
        const detailViewUrl = "/classfiedDetailView?adId=" + this.state.currentAd.classifiedId;

        if (this.state.submitted) {
            return (
                //Or to redirect to the detail view of the newly created ad, use pathname: detailViewUrl, thorugh a permissions issue needs to be dealt with for it to work: Authorizer::validateSession - jsonwebtoken.verify / Failed (403 Forbidden)
                <Redirect to={{
                    pathname: '/home',
                    state: { message: "Your ad has been successfully created!" }
                }} push />
            );
        } else {
            const categoryOptionsArray = (this.state.categories).map(function (value, index) {
                return <option key={index} value={value}>{value}</option>;
            });
            return (
                <div className="col-sm-8 offset-sm-2">
                    <div className="card">
                        <div className="card-block">
                            <h2>Create a classified ad</h2>
                            <form id="addClassifiedAdForm" name="addClassifiedAdForm">
                                <input type="hidden" value={this.state.classifiedId} className="form-control" id="classifiedId" name="classifiedId" />
                                <label htmlFor="title" className="sr-only">Title</label>
                                <div className="input-group">
                                    <input type="text" value={this.state.title} className="form-control" id="title" name="title" placeholder="Title" aria-describedby="basic-addon1" onChange={this.handleChangeInput} required/>
                                </div>
                                <label htmlFor="description" className="sr-only">Description</label>
                                <div className="input-group">
                                    <textarea value={this.state.description} className="form-control" id="description" name="description" placeholder="Description" aria-describedby="basic-addon1" onChange={this.handleChangeInput} required></textarea>
                                </div>
                                <label htmlFor="location" className="sr-only">Location</label>
                                <div className="input-group">
                                    <input type="text" value={this.state.location} className="form-control" id="location" name="location" placeholder="Location" aria-describedby="basic-addon1" onChange={this.handleChangeInput} required/>
                                </div>
                                <label htmlFor="type" className="sr-only">Offered or Wanted</label>
                                <div className="input-group">
                                    <select id="type" name="type" onChange={this.handleChangeInput} >
                                        <option value="offered">Offered</option>
                                        <option value="wanted">Wanted</option>
                                    </select>
                                </div>
                                <label htmlFor="category">Category</label>
                                <div className="input-group">
                                    <select id="category" name="category" onChange={this.handleChangeInput} >
                                        {categoryOptionsArray}
                                    </select>
                                </div>
                                <input type="hidden" value={this.state.userId} className="form-control" id="userId" name="userId" />
                                <input type="hidden" value={this.state.status} className="form-control" id="status" name="status" />
                                <div className="droppable" id="file-drop-zone">
                                    <p>Drop images to upload here</p>
                                </div>
                                <img src={this.state.previewImage} id="preview-img-tag" width="200px" />
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