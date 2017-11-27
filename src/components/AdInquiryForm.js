import React, { Component } from 'react';

class AdInquiryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            name: "",
            email: "",
            message: "",
            date: "",
            userId: "",
            classifiedId: "" //To be received as props from ClassifiedDetailView
        }
    }

    handleChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmitAdInquiry=(event)=>{
        event.preventDefault();
        const scope = this;
        let currentDate = new Date();
        
        scope.setState({
            date: currentDate,
        });
        
        fetch('/adInquiryConfirmation',{
            method: 'POST',
            body: scope.state 
        }).then(function(response){
            //Email will have been sent by the server (to do) and a response in the form of a success message should be returned.
        }).then(function(){
            scope.setState({
                submitted: true
            })
        });
    }

    render() {
        return(
            <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
                 <div className="card ad-inquiry-card">
                     <div className="card-block">
                         <h5>Respond to the ad</h5>
                         <form id="adInquiryForm" name="adInquiryForm">
                             <label htmlFor="name" className="sr-only">Name</label>
                             <div className="input-group">
                                 <input type="text" value={this.state.name} className="form-control" id="name" name="name" placeholder="Your name" aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                             </div>
                             <label htmlFor="email" className="sr-only">Email</label>
                             <div className="input-group">
                                 <input type="email" value={this.state.email} className="form-control" id="email" name="email" placeholder="Your email address" aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                             </div>
                             <label htmlFor="message" className="sr-only">Message</label>
                             <div className="input-group">
                                 <textarea value={this.state.message} className="form-control" id="message" name="description" placeholder="Message" aria-describedby="basic-addon1" onChange={this.handleChangeInput}></textarea>
                             </div>
                             <input type="hidden" value={this.state.userId} className="form-control" id="userId" name="userId" />
                             <input type="hidden" value={this.state.classifiedId} className="form-control" id="status" name="classifiedId" />
                             <button type="submit" className="btn btn-primary" id="submitAdInquiry" onClick={this.handleSubmitAdInquiry}>Send</button>
                         </form>
                     </div>
                 </div >
             </div>
         )
    }  
}

export default AdInquiryForm;