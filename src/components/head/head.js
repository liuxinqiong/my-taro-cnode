import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './head.less'

class Head extends Component {
  render() {
    return (
      <View className="login-head">
        <Image className="login-head-back" src={require('../../assets/img/loginBack.jpg')}></Image>
        <Image className="login-head-head" src={require('../../assets/img/head.png')}></Image>
      </View>
    )
  }
}

export default Head;
