import Taro from '@tarojs/taro'
import api from '../constants/api'
import { postJSON } from '../utils/request'

export function accessUserToken(params) {
  return async dispatch => {
    const result = await postJSON(api.checkusertoken, params)
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'loginSuccess',
        payload: {
          accessToken: params.accesstoken,
          loginName: result.data.loginname
        }
      })
      return result.data
    } else {
      dispatch({
        type: 'loginFail',
        payload: {
          accessToken: null,
          loginName: null
        }
      })
    }
    return false
  }
}
