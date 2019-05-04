import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { getTopicInfo, admireTopic, replyContent } from '../../actions/topicList'
import TopicInfo from '../../components/topicInfo/topicInfo'
import Replies from '../../components/topicInfo/replies'
import ReplyContent from '../../components/topicInfo/replyContent'
import './detail.less'

const isweapp = process.env.TARO_ENV === 'weapp'

@connect(function(store) {
  return {
    topicInfo: store.topicList.topicInfo,
    replies: store.topicList.replies,
    user: store.user,
    admireState: store.topicList.admireState
  }
}, function(dispatch) {
  return {
    getTopicInfo(params) {
      dispatch(getTopicInfo(params))
    },
    admireTopic(params) {
      dispatch(admireTopic(params))
    }
  }
})
class Detail extends Component {
  config = {
    navigationBarTitleText: '话题详情'
  }
  state = {
    showReplyContent: false
  }
  admire(reply) {
    const params = {
      replyid: reply.id,
      accessToken:  this.props.user.accessToken
    }
    this.props.admireTopic(params)
  }
  getDetail() {
    const params = {
      id: this.$router.params.topicId,
      mdrender: true,
      accesstoken: this.props.user.accessToken
    };
    this.props.getTopicInfo(params)
  }
  reply() {
    this.setState({
      showReplyContent: true
    })
  }
  closeReplyContent() {
    this.setState({
      showReplyContent: false
    })
  }
  replyContent(content) {
    const {currentReply} = this.state
    const reply_id = currentReply ? currentReply.id:null
    const preName = currentReply ? '@' + currentReply.author.loginname + ' ':''
    const params = {
      reply_id,
      topicid: this.$router.params.topicId,
      accessToken: this.props.user.accessToken,
      content: preName + content
    }
    replyContent(params).then(result => {
      if(result.success) {
        this.getDetail()
        this.closeReplyContent()
      }
    })
  }
  replyToReply(reply) {
    this.setState({
      currentReply: reply,
      showReplyContent: true
    })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.admireState !== nextProps.admireState) {
      this.getDetail()
    }
  }
  componentWillMount() {
    this.getDetail()
  }
  render() {
    const { topicInfo, replies} = this.props;
    const { showReplyContent } = this.state;
    return (
      <View className="detail">
        {showReplyContent?<ReplyContent onCancelReplyContent={this.closeReplyContent.bind(this)} onOKReplyContent={this.replyContent.bind(this)}></ReplyContent>:null}
        <TopicInfo topicInfo={topicInfo}></TopicInfo>
        <Replies onReplyToReply={this.replyToReply.bind(this)} replies={replies} onAdmire={this.admire.bind(this)}></Replies>
        <Button className="reply-btn" onClick={this.reply.bind(this)}>回复</Button>
      </View>
    )
  }
}

export default Detail;
