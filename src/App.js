import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [ user, setUser ] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.fields.value, password: password.fields.value
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
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
      {user === null
        ? loginForm()
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout} type="button">logout</button></p>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm
              user={user}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          {props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={like}
              removeBlog={remove}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  showNotification,
  initializeBlogs,
  likeBlog,
  removeBlog,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
