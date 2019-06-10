import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image, RichText } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './replies.less'
import { myTimeToLocal } from '../../utils/date'
import { validateUser } from '../../actions/user'

const isweapp = process.env.TARO_ENV === 'weapp'

class Replies extends Component {
  admire(reply) {
    const { user } = this.props;
    validateUser(user).then(result => {
      if(result) {
        this.props.onAdmire && this.props.onAdmire(reply)
      } else {
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  }
  replyToReply(reply) {
    const { user } = this.props;
    validateUser(user).then(result => {
      if(result) {
        this.props.onReplyToReply(reply)
      } else {
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  }
  render() {
    const {replies} = this.props;
    return (
      <View className="topicinfo-replies">
        {
          replies.map((item, index) => {
            return (
              <View key={item.id} className="topicinfo-reply">
                <Image className="topicinfo-reply-image" src={item.author.avatar_url}></Image>
                <View className="topicinfo-reply-right">
                  <View className="topicinfo-reply-right-body">
                    <View className="topicinfo-reply-right-pie">
                      <Text className="loginname">{item.author.loginname}</Text>
                      <Text className="floor">{(index + 1) + '楼'}</Text>
                      <Text className="time">{myTimeToLocal(item.create_at)}</Text>
                    </View>
                    <View className="topicinfo-reply-right-content">
                      {
                        isweapp ? <RichText nodes={item.content}></RichText> : <View dangerouslySetInnerHTML={{__html: item.content}}></View>
                      }
                    </View>
                  </View>
                  <View className="topicinfo-reply-right-zan">
                    <Image onClick={this.admire.bind(this, item)} className="topicinfo-reply-image" src={item.is_uped?require('../../assets/img/myzan.png'):require('../../assets/img/zan.png')}></Image>
                    <Text>{item.ups.length}</Text>
                    <Image onClick={this.replyToReply.bind(this, item)} className="topicinfo-reply-image" src={require('../../assets/img/zhuan.png')}></Image>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
Replies.defaultProps = {
  replies: []
}
export default Replies;
