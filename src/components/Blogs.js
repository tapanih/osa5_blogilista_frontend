import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { showNotification } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  const blogFormRef = React.createRef()

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
      <h2>blogs</h2>
      <p>{props.user.name} logged in <button onClick={handleLogout} type="button">logout</button></p>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm
          user={props.user}
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
  removeBlog
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs
