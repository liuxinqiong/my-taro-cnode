import Taro, { Component } from '@tarojs/taro';
import { ScrollView, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { getTopicList, getNextList } from '../../actions/topicList'
import Topic from './topic'

@connect(function(store) {
  return {...store.topicList, currentCata: store.menu.currentCata}
}, function(dispatch) {
  return {
    getTopicList(params) {
      dispatch(getTopicList(params));
    },
    getNextList(params) {
      dispatch(getNextList(params));
    }
  }
})
class TopicList extends Component {
  componentWillMount() {
    const { page, limit, currentCata } = this.props;
    this.props.getTopicList({
      page,
      limit,
      tab: currentCata.key
    })
  }
  onScrollToLower() {
    const { page, limit, currentCata } = this.props;
    this.props.getNextList({
      page: page + 1,
      limit,
      tab: currentCata.key
    })
  }
  render() {
    const { list } = this.props;
    return (
      <ScrollView style="height: 650PX" scrollY={true} onScrollToLower={this.onScrollToLower.bind(this)}>
        {
          list.map(item => <Topic item={item} key={item.id}></Topic>)
        }
      </ScrollView>
    )
  }
}

export default TopicList;
