import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
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
          {blog.likes} <button onClick={handleLike}>like</button><br/>
          Added by {blog.user.name}<br/>
          {blog.user.id === user.id ?  <button onClick={handleRemove}>remove</button> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Blog