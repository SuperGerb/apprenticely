
const initialState = {
  search: "Hello there"
}

//You always have to copy the state to start.(Note: the spread operator copies state (equivalent to concat()). It doesn't copy nested values, so be careful!) And update the state immutably

const reducer = (state = initialState, action) => { 
  switch(action.type){ 
    case "UPDATE_SEARCH": return {...state, search:action.value};
    default:
      return state;
  } 
}

export default reducer;