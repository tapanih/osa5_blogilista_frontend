import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = (props) => {

  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <Table striped>
        <tbody>
          {props.user.blogs.map(blog =>
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id)
  }
}

const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser