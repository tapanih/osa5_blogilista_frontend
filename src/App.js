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

const App = (props) => {
  const [ blogs, setBlogs ] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [ user, setUser ] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(initialBlogs)
      })
  }, [])

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

  const updateLikes = likedBlog => {
    const newBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
    blogService.update(likedBlog.id, newBlog)
    const newBlogs = blogs.map(blog => blog.id !== likedBlog.id ? blog : newBlog)
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    props.showNotification(`Liked ${likedBlog.title} by ${likedBlog.author}`, 'success')
  }

  const removeBlog = removedBlog => {
    blogService.remove(removedBlog.id)
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    props.showNotification(`Removed ${removedBlog.title} by ${removedBlog.author}`, 'success')
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
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

const ConnectedApp = connect(null, { showNotification })(App)
export default ConnectedApp
