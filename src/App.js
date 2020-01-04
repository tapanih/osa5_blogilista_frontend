import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'

const App = (props) => {

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  useEffect(() => {
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [props.user])

  const handleLogout = (event) => {
    event.preventDefault()
    props.logoutUser()
  }

  const like = blog => {
    props.likeBlog(blog)
    props.showNotification(`Liked ${blog.title} by ${blog.author}`, 'success')
  }

  const remove = blog => {
    props.removeBlog(blog)
    props.showNotification(`Removed ${blog.title} by ${blog.author}`, 'success')
  }

  return (
    <div>
      <Notification />
      {props.user === null
        ? <LoginForm />
        :
        <div>
          <h2>blogs</h2>
          <p>{props.user.name} logged in <button onClick={handleLogout} type="button">logout</button></p>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm
              user={props.user}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          {props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={like}
              removeBlog={remove}
              user={props.user}
            />
          )}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  showNotification,
  initializeBlogs,
  likeBlog,
  removeBlog,
  logoutUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
