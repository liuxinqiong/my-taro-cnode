const TOPIC_STATE = {
  page: 1,
  limit: 20,
  list: [],
  topicInfo: {},
  replies: [],
  admireState: false
}

export default function topicList(prestate = TOPIC_STATE, action) {
  switch(action.type) {
    case 'getTopicList':
      return {...prestate, list: action.payload, page: 1};
    case 'appendTopicList':
      return {...prestate,
        list: prestate.list.concat(action.payload.list),
        page: action.payload.page
      };
    case 'getTopicInfo':
      return {...prestate, replies: action.payload.replies, topicInfo: {...action.payload, replies: null}};
    case 'admireSuccess':
      return {...prestate, admireState: !prestate.admireState}
    default:
      return {...prestate};
  }
}
