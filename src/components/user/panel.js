import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import './panel.less'
import { myTimeToLocal } from '../../utils/date'

class Panel extends Component {
  toDetail(item) {
    Taro.navigateTo({
      url: `/pages/detail/index?topicId=${item.id}`
    })
  }
  render() {
    const {listData, title} = this.props;
    return (
      <View className='topic-panel'>
        <View className='topic-panel-title'>{title}</View>
        {
          listData.map(item => {
            return (
              <View key={item.id} className='topic-panel-list' onClick={this.toDetail.bind(this, item)}>
                <Image src={item.author.avatar_url} className='topic-panel-list-img'></Image>
                <Text className='topic-panel-list-title'>{item.title}</Text>
                <Text className='topic-panel-list-date'>{myTimeToLocal(item.last_reply_at)}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default Panel;
