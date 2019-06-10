import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import Head from '../../components/head/head'
import Panel from '../../components/user/panel'
import { getUserInfo } from '../../actions/user'
import './user.less'
@connect(
  store => ({...store.user})
)
class User extends Component {
  state = {
    recent_topics: [],
    recent_replies: []
  }
  componentDidMount() {
    getUserInfo({
      loginName: this.props.loginName
    }).then(result => {
      this.setState({
        recent_topics: result.data.recent_topics,
        recent_replies: result.data.recent_replies
      })
    })
  }
  publishTopic() {
    Taro.redirectTo({
      url: '/pages/publish/publish'
    })
  }
  render() {
    const {loginName, avatar_url} = this.props;
    const {recent_topics, recent_replies} = this.state;
    return (
      <View>
        <Head loginName={loginName} avatar_url={avatar_url}></Head>
        <Panel listData={recent_topics} title='最近发布的话题'></Panel>
        <Panel listData={recent_replies} title='最近收到的回复'></Panel>
        <Button className="publish-btn" onClick={this.publishTopic.bind(this)}>发布话题</Button>
      </View>
    )
  }
}

export default User;
