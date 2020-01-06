import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control data-cy="username" {...username.fields} />
          <Form.Label>password:</Form.Label>
          <Form.Control data-cy="password" {...password.fields} />
          <Button data-cy="login" variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const ConnectedLoginForm = connect(null, { loginUser })(LoginForm)
export default ConnectedLoginForm