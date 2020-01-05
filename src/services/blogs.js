import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, likes) => {
  const response = await axios.put(`${baseUrl}/${id}`, likes)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios
    .post(`${baseUrl}/${id}/comments`, { comment }, config)
  console.log(response.data)
  return response.data
}

export default { setToken, getAll, create, update, remove, comment }