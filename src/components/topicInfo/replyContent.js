import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Textarea } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './replyContent.less'

class ReplyContent extends Component {
  state = {
    value: ''
  }
  btnOK() {
    if(this.state.value) {
      this.props.onOKReplyContent(this.state.value)
    } else {
      Taro.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
    }
  }
  btnCancel() {
    this.props.onCancelReplyContent()
  }
  changeContent(event) {
    if(event && event.target) {
      this.setState({
        value: event.target.value
      })
    }
  }
  render() {
    return (
      <View className="reply-content">
        <Textarea onInput={this.changeContent.bind(this)} className="reply-text" placeholder="请输入回复内容"></Textarea>
        <View className="reply-btn-group">
          <Button className="btn" onClick={this.btnOK.bind(this)}>确定</Button>
          <Button className="btn" onClick={this.btnCancel.bind(this)}>取消</Button>
        </View>
      </View>
    )
  }
}

export default ReplyContent;
