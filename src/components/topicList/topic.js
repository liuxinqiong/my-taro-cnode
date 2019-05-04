import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './topic.less';
import { myTimeToLocal } from '../../utils/date'

class Topic extends Component {
  goToDetail() {
    Taro.navigateTo({
      url: '/pages/detail/index?topicId='+this.props.item.id
    })
  }
  render() {
    const {item} = this.props;
    return (
      <View className="topiclist-topic" onClick={this.goToDetail.bind(this)}>
        <Image className="head-img" src={item.author.avatar_url}></Image>
        <View className="right">
          <View className="topic-title">
            {
              item.top ? <Text className="topic-up">置顶</Text> : item.tab === 'share' ? <Text className="topic-up blue">分享</Text> : <Text className="topic-up blue">问答</Text>
            }
            <Text>{item.title}</Text>
          </View>
          <View className="topic-info">
            <Text>{item.author.loginname}</Text>
            <Text>{item.reply_count + '/' + item.visit_count}</Text>
            <Text>创建时间{myTimeToLocal(item.create_at)}</Text>
          </View>
        </View>
      </View>
    )
  }
}
Topic.defaultProps = {
  item: {}
}
export default Topic;
