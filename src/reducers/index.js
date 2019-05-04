import { combineReducers } from 'redux'
import menu from './menu'
import topicList from './topic'
import user from './user'

export default combineReducers({
  menu,
  topicList,
  user
})
