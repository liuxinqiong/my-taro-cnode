import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './head.less'
import { IHeadProps } from '../../interfaces/IHead'

class Head extends Component<IHeadProps> {
  render() {
    const {loginName, avatar_url} = this.props;
    return (
      <View className="login-head">
        <Image className="login-head-back" src={require('../../assets/img/loginBack.jpg')}></Image>
        <Image className="login-head-head" src={avatar_url ? avatar_url : require('../../assets/img/head.png')}></Image>
        {loginName ? <Text className='login-head-name'>{loginName}</Text> : null}
      </View>
    )
  }
}

export default Head;
