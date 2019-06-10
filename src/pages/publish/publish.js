import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Picker, Textarea, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './publish.less';
import { submitTopic } from '../../actions/topicList'

@connect(function(store) {
  return {...store.menu, ...store.user, topicInfo: store.topicList.topicInfo}
})
class Publish extends Component {
  componentWillMount() {
    const { edit } = this.$router.params;
    const { topicInfo } = this.props;
    this.setState({
      isEdit:edit=='1',
      topicInfo:topicInfo,
      title:topicInfo?topicInfo.title:'',
      content:topicInfo?topicInfo.content:''});
    // H5 环境嵌套 state 会有问题
    // this.setState({
    //   isEdit: edit === 1
    // }, () => {
    //   if(this.state.isEdit) {
    //     const { topicInfo } = this.props;
    //     this.setState({topicInfo, title: topicInfo.title, content: topicInfo.content})
    //   }
    // })
  }
  state = {
    selectCata: null,
    title: null,
    content: null,
    isEdit: false
  }
  changeCata(event) {
    const { cataData } = this.props;
    this.setState({
      selectCata: cataData[event.detail.value]
    })
  }
  titleChange(event) {
    this.setState({
      title: event.target.value
    })
  }
  contentChange(event) {
    this.setState({
      content: event.target.value
    })
  }
  submitTopic() {
    const { title, content, selectCata } = this.state;
    const { accessToken, topicInfo } = this.props;
    if (title && content && selectCata) {
      const params = {tab: 'dev', title, content, accessToken, topic_id: topicInfo.id};
      if(idEdit) {
        updateTopic(params).then(result => {
          if(result) {
            Taro.navigateBack()
          }
        })
      } else {
        submitTopic(params).then(result => {
          if(result) {
            Taro.redirectTo({
              url: '/pages/user/user'
            })
          }
        })
      }
    } else {
      Taro.showToast({
        title: '信息不完整',
        icon: 'none'
      })
    }
  }
  render() {
    const { cataData } = this.props;
    const { selectCata, topicInfo } = this.state;
    return (
      <View className="publish-topic">
        <Input value={topicInfo?topicInfo.title:''} className="publish-topic-title" onInput={this.titleChange.bind(this)} placeholder="请输入标题"></Input>
        <Textarea value={topicInfo?topicInfo.content:''} className="publish-topic-content" onInput={this.contentChange.bind(this)} placeholder="请输入内容"></Textarea>
        <Picker onChange={this.changeCata.bind(this)} mode="selector" range={cataData} rangeKey='value'>
          <View className="publish-topic-cata">{selectCata?selectCata.value:'请选择'}</View>
        </Picker>
        <Button className="publish-topic-btn" onClick={this.submitTopic.bind(this)}>提交</Button>
      </View>
    )
  }
}

export default Publish;
