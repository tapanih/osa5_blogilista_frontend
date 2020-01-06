import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { showNotification } from '../reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  const blogFormRef = React.createRef()

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          user={props.user}
        />
      </Togglable>
      {props.blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
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
