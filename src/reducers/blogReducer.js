import blogService from '../services/blogs'

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

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  default: return state
  }
}

export default blogReducer