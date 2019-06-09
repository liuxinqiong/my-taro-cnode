import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Picker, Textarea, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './publish.less';
import { submitTopic } from '../../actions/topicList'

@connect(function(store) {
  return {...store.menu, ...store.user}
})
class Publish extends Component {
  state = {
    selectCata: null,
    title: null,
    content: null
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
    const { accessToken } = this.props;
    if (title && content && selectCata) {
      const params = {tab: 'dev', title, content, accessToken};
      submitTopic(params).then(result => {
        if(result) {
          Taro.navigateBack()
        }
      })
    } else {
      Taro.showToast({
        title: '信息不完整',
        icon: 'none'
      })
    }
  }
  render() {
    const { cataData } = this.props;
    const { selectCata } = this.state;
    return (
      <View>
        <Picker onChange={this.changeCata.bind(this)} mode="selector" range={cataData} rangeKey='value'>
          <View>{selectCata?selectCata.value:'请选择'}</View>
        </Picker>
        <Input onInput={this.titleChange.bind(this)} placeholder="请输入标题"></Input>
        <Textarea onInput={this.contentChange.bind(this)} placeholder="请输入内容"></Textarea>
        <Button onClick={this.submitTopic.bind(this)}>提交</Button>
      </View>
    )
  }
}

export default Publish;
