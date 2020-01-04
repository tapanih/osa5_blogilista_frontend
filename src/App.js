import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { logoutUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [props.user])

  return (
    <div>
      <Notification />
      {props.user === null
        ? <LoginForm />
        : <Blogs />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
