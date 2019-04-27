export function showDrawer() {
  return function(dispatch) {
    dispatch({type: 'showDrawer'})
  }
}

export function changeCata(cata) {
  return function(dispatch) {
    dispatch({type: 'changeCata', payload: cata})
  }
}

export function hideDrawer() {
  return dispatch => {
    dispatch({type: 'hideDrawer'})
  }
}
