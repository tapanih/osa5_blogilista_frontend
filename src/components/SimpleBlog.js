import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='simpleBlog'>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button className='like' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog