import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { Button, Nav, Navbar } from 'react-bootstrap'

import { logoutUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [props.user])

  const handleLogout = (event) => {
    event.preventDefault()
    props.logoutUser()
  }

  return (
    <div className="container">
      <Router>
        <Notification />
        {props.user === null
          ? <LoginForm />
          : <>
            <Navbar collapseOnSelect expand="sm" bg="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/">blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/users">users</Link>
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                  <Navbar.Text style={{ paddingRight: 15 }}>
                    {props.user.name} logged in
                  </Navbar.Text>
                  <Button variant="outline-info" onClick={handleLogout}>
                    logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({ match }) =>
              <User id={match.params.id} />
            } />
            <Route path="/blogs/:id" render={({ match }) =>
              <Blog id={match.params.id} />
            } />
            </>}
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
