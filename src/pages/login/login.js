import Taro, { Component } from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import Head from '../../components/head/head'
import './login.less'
import { accessUserToken } from '../../actions/user'

@connect(function(store) {
  return {user: store.user}
}, function(dispatch) {
  return {
    accessUserToken(params) {
      return dispatch(accessUserToken(params))
    }
  }
})
class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  changeToken(event) {
    if(event && event.target) {
      this.setState({
        token: event.target.value
      })
    }
  }
  loginToken() {
    if(this.state.token) {
      this.props.accessUserToken({
        accesstoken: this.state.token
      }).then(result => {
          Taro.redirectTo({
            url: '/pages/user/user'
          })
      })
    } else {
      Taro.showToast({
        title: '请输入密钥再进行登录验证',
        icon: 'none'
      })
    }
  }
  render() {
    return (
      <View className="login-body">
        <Head></Head>
        <View className="form">
          <Input onInput={this.changeToken.bind(this)} className="access-input" placeholder="请输入accessToken"></Input>
          <Button onClick={this.loginToken.bind(this)} className="btn-login">登录</Button>
        </View>
      </View>
    )
  }
}

export default Login;
