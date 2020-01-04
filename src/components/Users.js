import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const Users = (props) => {

  useEffect(() => {
    props.initializeUsers()
  }, [props])

  return (
    <div>
      <h2>blogs</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}><td>{user.name}</td></Link>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers,
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default ConnectedUsers