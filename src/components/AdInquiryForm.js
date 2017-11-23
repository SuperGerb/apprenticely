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
            classifiedId: "" //gotten as props from detail view
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

        }).then(function(){
            scope.setState({
                submitted: true
            });
        });
    }

    render() {
        return(
            <div className="col-sm-8 offset-sm-2" >
                 <div className="card">
                     <div className="card-block">
                         <h2>Respond to the ad:</h2>
                         <form id="adInquiryForm" name="adInquiryForm">
                             <label htmlFor="name">Name</label>
                             <div className="input-group">
                                 <input type="text" value={this.state.name} className="form-control" id="name" name="name" placeholder="Your name" aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                             </div>
                             <br />
                             <label htmlFor="email">Email</label>
                             <div className="input-group">
                                 <input type="email" value={this.state.email} className="form-control" id="email" name="email" placeholder="Your email address" aria-describedby="basic-addon1" onChange={this.handleChangeInput} />
                             </div>
                             <br />
                             <label htmlFor="message">Message</label>
                             <div className="input-group">
                                 <textarea value={this.state.message} className="form-control" id="message" name="description" aria-describedby="basic-addon1" onChange={this.handleChangeInput}></textarea>
                             </div>
                             <br />
                             <input type="hidden" value={this.state.userId} className="form-control" id="userId" name="userId" />
                             <input type="hidden" value={this.state.classifiedId} className="form-control" id="status" name="classifiedId" />
                             <button type="submit" className="btn btn-primary" id="submitAdInquiry" onClick={this.handleSubmitAdInquiry}>Send message</button>
                         </form>
                     </div>
                 </div >
             </div>
         )
    }  
}

export default AdInquiryForm;