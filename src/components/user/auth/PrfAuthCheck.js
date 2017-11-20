import React, { Component } from "react";
import {withRouter} from 'react-router';
import PrfHttpClient from 'profilic-client';

//Higher Order Component
export default function (TargetComponent) {
    console.log("in authcheck!!!!!!!!!!!!!!");
    //define the wrapper class. note: withRouter allows access to match, location and history via props
    @withRouter
    class PrfAuthChecker extends Component {
        constructor(props){
            super(props);
            this.state={isAuthed:false};
            this.defaultNoAuthPath = process.env.PRF_DEFAULT_NOAUTH_PATH || "/";
            this.prfClient = new PrfHttpClient();
        }

        componentWillMount=()=>{
            console.log('PrfAuthChecker::componentWillMount - validating session...');
            this.prfClient.authenticate(this.checkAuthResult);
        }

        checkAuthResult=(responseData)=>{
            console.log('PrfAuthChecker::checkAuthResult');
            if(!responseData) {
                console.log('PrfAuthChecker::checkAuthResult - invalid session - bounced');
                this.props.history.push(this.defaultNoAuthPath);
            } else {
                console.log('PrfAuthChecker::checkAuthResult - validated!');
                this.setState({isAuthed:true});
            }
        }

        render(){
            if(!this.state.isAuthed) return null;
            console.log('PrfAuthChecker::checkAuthResult - rendering target component...');
            return <TargetComponent {...this.props}/>
        }
        
    }

    return PrfAuthChecker;
}
