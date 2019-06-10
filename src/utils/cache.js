import Taro from '@tarojs/taro'

export function setCache(key, value) {
  let params = value;
  if(typeof value === 'object') {
    params = JSON.stringify(value);
  }
  Taro.setStorageSync(key, params);
}

export function getCache(key) {
  let result = Taro.getStorageSync(key);
  if(result) {
    result = JSON.parse(result);
  } else {
    return null;
  }
  return result;
}
