import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

import { Button, Form } from 'react-bootstrap'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title.fields.value,
        author: author.fields.value,
        url: url.fields.value
      }
      title.reset()
      author.reset()
      url.reset()
      props.createBlog(blog, props.user)
      props.showNotification(`a new blog "${blog.title} by ${blog.author}" added`, 'success')
    } catch (exception) {
      props.showNotification('blog could not be added', 'error')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control data-cy="title" {...title.fields} />
          <Form.Label>author:</Form.Label>
          <Form.Control data-cy="author" {...author.fields} />
          <Form.Label>url:</Form.Label>
          <Form.Control data-cy="url" {...url.fields} />
          <Button data-cy="submit" variant="primary" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  showNotification,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm