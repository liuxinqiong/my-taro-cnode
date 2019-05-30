import Taro from '@tarojs/taro'
import api from '../constants/api'
import { postJSON, getJSON } from '../utils/request'

export function accessUserToken(params) {
  return async dispatch => {
    const result = await postJSON(api.checkusertoken, params)
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'loginSuccess',
        payload: {
          accessToken: params.accesstoken,
          loginName: result.data.loginname,
          avatar_url: result.data.avatar_url
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

export async function getUserInfo(params) {
  let result = await getJSON(api.getuserinfo + params.loginName)
  if(result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({
      title: '拉取用户信息失败'
    })
  }
}
