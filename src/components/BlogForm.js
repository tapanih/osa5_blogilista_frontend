import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification, newNotification }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      newNotification(setNotification, `a new blog "${blog.title} by ${blog.author}" added`, 'success')
    } catch (exception) {
      newNotification(setNotification, 'blog could not be added', 'error')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm