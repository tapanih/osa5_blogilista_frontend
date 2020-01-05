import React from 'react'
import { connect } from 'react-redux'

import { showNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = (props) => {
  const comment = useField('text')

  if (props.blog === undefined) {
    return null
  }

  const like = () => {
    props.likeBlog(props.blog)
    props.showNotification(`Liked ${props.blog.title} by ${props.blog.author}`, 'success')
  }

  const remove = () => {
    if(window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)) {
      props.removeBlog(props.blog)
      props.showNotification(`Removed ${props.blog.title} by ${props.blog.author}`, 'success')
    }
  }

  const newComment = (event) => {
    event.preventDefault()
    try {
      props.addComment(props.blog, comment.fields.value)
      comment.reset()
      props.showNotification('comment added', 'success')
    } catch (exception) {
      props.showNotification('comment could not be added', 'error')
    }
  }

  return (
    <div>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <a href={props.blog.url}>{props.blog.url}</a><br/>
      {props.blog.likes} <button onClick={like}>like</button><br/>
      Added by {props.blog.user.name}<br/>
      {props.blog.user.id === props.user.id ?  <button onClick={remove}>remove</button> : <></>}
      <h3>comments</h3>
      <form onSubmit={newComment}>
        <div><input {...comment.fields} /></div>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {props.blog.comments.map((content, index) =>
          <li key={index}>{content}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id),
    user: state.user
  }
}

const mapDispatchToProps = {
  addComment,
  showNotification,
  likeBlog,
  removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog