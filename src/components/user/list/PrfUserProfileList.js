//PrfUserProfileList.js
import React, { Component } from 'react';
import PrfHorizontalSummary from '../summary/PrfHorizontalSummary';
import PrfVerticalSummary from '../summary/PrfVerticalSummary';


export default class PrfUserProfileList extends Component {
  constructor(props){
    super(props);

    //there might be more styles in the future:
    //assume sensible defaults and don't presume a style will be passed in
    let orientn = 'horizontal';
    if(this.props.hasOwnProperty('orientation')) orientn = this.props.orientation;

    this.state= {
      orientation: orientn // horizontal|vertical
    };
  }

  componentWillReceiveProps(newprops){
    //changed orientation/style
    let orientn = this.state.orientation;
    if(newprops.hasOwnProperty('orientation')) {
      orientn = newprops.orientation; 
      this.setState({ orientation: orientn });
    }
  }

  render() {
    if(!this.props.profileList) return(null);

    let users = [];
    let component = (this.state.orientation == "horizontal") ? PrfHorizontalSummary : PrfVerticalSummary;

    this.props.profileList.forEach( user => {
      users.push (React.createElement( component, {
        key: user._id,
        user: user
      }));
    });

    //change flexbox properties based on orientation:
    let cssclass = (this.state.orientation == 'horizontal') ? 'd-flex flex-column-reverse' : 'card-group';

    return (
      <div className={cssclass}>
        {users}
      </div>
    );
  }
}
