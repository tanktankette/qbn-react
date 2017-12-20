import React, { Component } from 'react'
import './registration.css'
/* global fetch */

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registering: false,
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      registerPasswordRepeat: ''
    }
    this.changeRegistering = this.changeRegistering.bind(this)
    this.changeLoginUsername = this.changeLoginUsername.bind(this)
    this.changeLoginPassword = this.changeLoginPassword.bind(this)
    this.changeRegisterUsername = this.changeRegisterUsername.bind(this)
    this.changeRegisterEmail = this.changeRegisterEmail.bind(this)
    this.changeRegisterPassword = this.changeRegisterPassword.bind(this)
    this.changeRegisterPasswordRepeat = this.changeRegisterPasswordRepeat.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  changeLoginUsername (event) {
    this.setState({loginUsername: event.target.value})
  }

  changeLoginPassword (event) {
    this.setState({loginPassword: event.target.value})
  }

  changeRegisterUsername (event) {
    this.setState({registerUsername: event.target.value})
  }

  changeRegisterEmail (event) {
    this.setState({registerEmail: event.target.value})
  }

  changeRegisterPassword (event) {
    this.setState({registerPassword: event.target.value})
  }

  changeRegisterPasswordRepeat (event) {
    this.setState({registerPasswordRepeat: event.target.value})
  }

  changeRegistering (event) {
    this.setState({registering: !this.state.registering})
  }

  register () {
    let newUser = {
      username: this.state.registerUsername,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    }
    let pkg = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    }

    fetch('https://us-central1-qbn-react.cloudfunctions.net/api/register', pkg)
  }

  login () {
    let newUser = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    }
    let pkg = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    }
    fetch('https://us-central1-qbn-react.cloudfunctions.net/api/login', pkg)
      .then((res) => res.json())
      .then((data) => this.props.changeCharacter(data))
  }

  render () {
    // let rows = []
    return (
      <main>
        <div className={this.state.registering ? 'fade' : ''}>
          <input type='text' onChange={this.changeLoginUsername} value={this.state.loginUsername} placeholder='Username' />
          <input type='password' onChange={this.changeLoginPassword} value={this.state.loginPassword} placeholder='Password' />
          <button onClick={this.login}>Login</button>
          <button onClick={this.changeRegistering}>Register</button>
        </div>
        <div className={this.state.registering ? 'registerPanel' : 'hidden'}>
          <input type='text' onChange={this.changeRegisterUsername} value={this.state.registerUsername} placeholder='Username' />
          <input type='text' onChange={this.changeRegisterEmail} value={this.state.registerEmail} placeholder='Email' />
          <input type='password' onChange={this.changeRegisterPassword} value={this.state.registerPassword} placeholder='Password' />
          <input type='password' onChange={this.changeRegisterPasswordRepeat} value={this.state.registerPasswordRepeat} placeholder='Repeat Password' />
          <button onClick={this.changeRegistering}>Close</button>
          <button onClick={this.register}>Register</button>
        </div>
      </main>
    )
  }
}
