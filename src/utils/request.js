import Taro from '@tarojs/taro';

export function getJSON(url, data) {
  return Taro.request({
    url: url,
    data: data,
    method: 'GET'
  })
}

export function postJSON(url, data) {
  return Taro.request({
    url: url,
    data: data,
    method: 'POST'
  })
}
