import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  useEffect(() => {
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [props.user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser({
        username: username.fields.value,
        password: password.fields.value,
      })
      username.reset()
      password.reset()
    } catch (exception) {
      props.showNotification('wrong username or password', 'error')
      username.reset()
      password.reset()
    }
  }

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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.fields} />
        </div>
        <div>
          password
          <input {...password.fields} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification />
      {props.user === null
        ? loginForm()
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
  loginUser,
  logoutUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
