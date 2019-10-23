let timeoutHandle

export const showNotification = (message, type) => {
  return async dispatch => {
    clearTimeout(timeoutHandle)
    timeoutHandle = setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)
    dispatch ({
      type: 'SHOW_NOTIFICATION',
      data: { message, type }
    })
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: ''
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer