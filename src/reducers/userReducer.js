import loginService from '../services/login'

let initialState = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) //TODO: move elsewhere
    dispatch ({
      type: 'LOGIN_USER',
      data: user,
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch ({
      type: 'LOGOUT_USER',
      data: ''
    })
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default: return state
  }
}

export default userReducer