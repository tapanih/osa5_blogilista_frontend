import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [ blogs, setBlogs ] = useState([])

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
