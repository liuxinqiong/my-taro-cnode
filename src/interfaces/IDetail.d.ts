export interface IDetailProps {
  user?: IUser,
  admireState?: boolean,
  getTopicInfo: IGetTopicInfo,
  topicInfo: ITopicInfo,
  replies: Array<IReply>,
  admireTopic?: IAdmireTopic
}

interface IReply {
  id: string,
  content: string,
  is_uped: boolean,
  [propName: string]: any
}

interface IUser {
  accessToken: string,
  [propName: string]: any
}

interface ITopicInfo {
  id: string,
  author_id: string,
  content: string,
  title: string,
  good: boolean,
  reply_count: number,
  [propName: string]: any
}

interface IGetTopicInfo {
  (params: any): void
}

interface IAdmireTopic {
  (params: any): void
}

export interface IDetailState {
  showReplyContent: boolean,
  currentReply?: IReply
}
