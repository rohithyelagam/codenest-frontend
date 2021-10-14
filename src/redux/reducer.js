const initial_state = {
  isLoggedin: false,
  onSignup:true,
  forgot:false,
  user:{
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }
};
const state2 = {
   firstName:"",
    lastName:"",
    email:"",
    password:""
}

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedin: true,
        onSignup:false,
        user:action.payload
      };
    case "LOGOUT":
      return {
        isLoggedin: false,
        onSignup:false,
        user:state2
      };
    case "CREATE_SIGNUP":
      return {
        onSignup:true,
        isLoggedin:true,
      }
    case "CLOSE_SIGNUP":
      return {
        onSignup:false,
        isLoggedin:false,
      }
    case "OPEN_FORGOT":
      return{
        onSignup:state.onSignup,
        isLoggedin:state.isLoggedin,
        forgot:true
      }
    case "CLOSE_FORGOT":
        return{
          onSignup:state.onSignup,
          isLoggedin:state.isLoggedin,
          forgot:false
      }
    
    default:
      return state;
  }
};
export default reducer;
