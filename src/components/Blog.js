import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.stopPropagation()
    event.preventDefault()
    updateLikes(blog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}<br/>
        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a><br/>
          <span>{blog.likes} <button onClick={handleLike}>like</button><br/></span>
          Added by {blog.user.name}<br/>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog