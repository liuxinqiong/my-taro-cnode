import Taro from '@tarojs/taro'
import { IValue } from '../interfaces/ICache'

export function setCache(key: string, value: IValue): void {
  let params: any = value;
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
