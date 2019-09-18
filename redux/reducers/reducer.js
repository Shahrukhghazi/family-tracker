

const INITIAL_STATES = {
  name:'',
  email:'',
  uid:'',
  allUsers:[]
};

export default function(state = INITIAL_STATES, action) {
  switch (action.type) {
 case "LOGGEDIN_USER":
 console.log(action.payload.uid+"user")
 return{
   ...state,
   uid:action.payload.uid, 
  name:action.payload.name, 
  email:action.payload.email, 
 }
 case "LIST_USERS":
 return{
   ...state,
  allUsers : action.payload
 }
    default:
      return state;
  }
}
