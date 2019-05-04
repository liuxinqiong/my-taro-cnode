import { getTopicList } from './topicList'

export function showDrawer() {
  return function(dispatch) {
    dispatch({type: 'showDrawer'})
  }
}

export function changeCata(cata) {
  return function(dispatch) {
    dispatch({type: 'changeCata', payload: cata})
    dispatch(getTopicList({
      page: 1,
      limit: 20,
      tab: cata.key
    }))
  }
}

export function hideDrawer() {
  return dispatch => {
    dispatch({type: 'hideDrawer'})
  }
}
