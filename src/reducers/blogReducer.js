import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

//TODO: error handling
export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: { ...newBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id
        }
      }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, likedBlog)
    dispatch ({
      type: 'LIKE_BLOG',
      data: likedBlog,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    blogService.remove(blog.id)
    dispatch ({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    state = action.data.sort((a, b) => b.likes - a.likes)
    return state
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'LIKE_BLOG': {
    const newState = state.map(blog =>
      blog.id !== action.data.id ? blog : action.data)
    state = newState.sort((a, b) => b.likes - a.likes)
    return state
  }
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default: return state
  }
}

export default blogReducer