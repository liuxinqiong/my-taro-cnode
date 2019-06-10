import { getCache, setCache } from '../utils/cache';
const cacheKey = 'cnode-user-key'
const user_cache = getCache(cacheKey) || {};
const USER_STATE = {
  ...user_cache
}
// 4351cf14-3dc3-4fb1-80db-8d4d637ec4d6
export default function user(prestate = USER_STATE, action) {
  switch(action.type) {
    case 'loginSuccess':
      let successState = {...prestate, ...action.payload}
      setCache(cacheKey, successState);
      return successState
   case 'loginFail':
      setCache()
      let failState = {...prestate, ...action.payload}
      setCache(cacheKey, failState);
      return failState
    default:
      return {...prestate}
  }
}
