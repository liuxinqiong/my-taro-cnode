const USER_STATE = {
  accessToken: null
}
// 4351cf14-3dc3-4fb1-80db-8d4d637ec4d6
export default function user(prestate = USER_STATE, action) {
  switch(action.type) {
    case 'loginSuccess':
      return {...prestate, ...action.payload}
   case 'loginFail':
      return {...prestate, ...action.payload}
    default:
      return {...prestate}
  }
}
