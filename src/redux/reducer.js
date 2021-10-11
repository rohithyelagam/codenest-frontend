const initial_state = {
  isLoggedin: false,
  onSignup:true,
  forgot:false,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedin: true,
        onSignup:false,
      };
    case "LOGOUT":
      return {
        isLoggedin: false,
        onSignup:false,
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
