export function login(firstName,lastName,email,password) {
   return {
      type: 'LOGIN',
      payload : {
         firstName,lastName,email,password
      }
   }
}
export function logout() {
   return {
      type: 'LOGOUT'
   }
}
export function openSignup() {
   return {
      type: 'CREATE_SIGNUP'
   }
}
export function closeSignup() {
   return {
      type: 'CLOSE_SIGNUP'
   }
}
export function openForgot() {
   return {
      type: 'OPEN_FORGOT'
   }
}
export function closeForgot() {
   return {
      type: 'CLOSE_FORGOT'
   }
}


