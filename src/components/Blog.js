import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}<br/>
        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} <button onClick={() => console.log('klikattu')}>like</button><br/>
          Added by {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog