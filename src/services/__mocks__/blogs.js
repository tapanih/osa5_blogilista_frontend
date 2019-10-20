const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    user: {
      username: 'admin',
      name: 'Admin',
      id: '5da096fa66a0d136db5615da'
    },
    url: 'https://reactpatterns.com/',
    likes: 7,
    id: '5da32ccb64a06515c913b2ae'
  },
  {
    title: 'title text',
    author: 'author name',
    user: {
      username: 'admin',
      name: 'Admin',
      id: '5da096fa66a0d136db5615da'
    },
    url: 'www.example.com',
    likes: 0,
    id: '5da6005f54d20a238f0c886b'
  },
  {
    title: 'My awesome blog',
    author: 'Arthur Author',
    user: {
      username: 'newuser',
      name: 'User',
      id: '5da70e101efa753e73db3ab9'
    },
    url: 'www.example.com',
    likes: 0,
    id: '5da70e631efa753e73db3aba'
  }
]

const setToken = () => {
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }