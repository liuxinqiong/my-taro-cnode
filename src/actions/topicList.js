import { getJSON, postJSON } from '../utils/request'
import api from '../constants/api'
import Taro from '@tarojs/taro'

// 请求首页
export function getTopicList(param) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, param);
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'getTopicList',
        payload: result.data.data
      })
    }
  }
}

export function getNextList(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, params);
    if(result && result.data && result.data.success) {
      if(result.data.data.length) {
        dispatch({
          type: 'appendTopicList',
          payload: {
            list: result.data.data,
            page: params.page
          }
        })
      }
    }
  }
}

export function getTopicInfo(params) {
  return async dispatch => {
    const result =await getJSON(api.gettopicinfo + params.id, params);
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'getTopicInfo',
        payload: result.data.data
      })
    }
  }
}

export function admireTopic(params) {
  return async dispatch => {
    const result = await postJSON(api.upreply + params.replyid + '/ups', params);
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'admireSuccess'
      })
    } else {
      Taro.showToast({
        title: '点赞失败',
        icon: 'none'
      })
    }
  }
}

export async function replyContent(params) {
  const result = await postJSON(api.replytopic + params.topicid + '/replies', params)
  if(result && result.data && result.data.success) {
    return result.data
  } else {
    Taro.showToast({
      title: '评论失败',
      icon: 'none'
    })
  }
}
