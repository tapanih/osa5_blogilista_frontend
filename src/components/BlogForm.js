import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ blogs, setBlogs, user, setNotification, newNotification, blogFormRef }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create({
        title: title.fields.value,
        author: author.fields.value,
        url: url.fields.value
      })
      title.reset()
      author.reset()
      url.reset()
      blog.user = {
        username: user.username,
        name: user.name,
        id: user.id
      }
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
          <input {...title.fields} />
        </div>
        <div>
          author:
          <input {...author.fields} />
        </div>
        <div>
          url:
          <input {...url.fields}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  newNotification: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default BlogForm