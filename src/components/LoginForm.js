import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser({
        username: username.fields.value,
        password: password.fields.value,
      })
      username.reset()
      password.reset()
    } catch (exception) {
      props.showNotification('wrong username or password', 'error')
      username.reset()
      password.reset()
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.fields} />
        </div>
        <div>
          password
          <input {...password.fields} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const ConnectedLoginForm = connect(null, { loginUser })(LoginForm)
export default ConnectedLoginForm