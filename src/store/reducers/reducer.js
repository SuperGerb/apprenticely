//To do:
//1. Populate initialState with the ads in the database
//2. When input in searchbox changes, call filter on the redux state
//3. Then setState in the relevant component for both the searchTerm and the currentlyDisplayed ads

import * as actionTypes from '../actions/actionTypes.js';


const initialState = {
  search: "Hello there",
  listOfAds: null
}

//You always have to copy the state to start.(Note: the spread operator copies state (equivalent to concat()). It doesn't copy nested values, so be careful!) And update the state immutably

const reducer = (state = initialState, action) => { 
  switch(action.type){ 
    case actionTypes.UPDATE_SEARCH: return {...state, search:action.value};
    default:
      return state;
  } 
}

export default reducer; 