import React, { Component } from 'react'
import './registration.css'

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registering: false
    }
    this.changeRegistering = this.changeRegistering.bind(this)
  }

  changeRegistering (event) {
    this.setState({registering: !this.state.registering})
  }

  render () {
    // let rows = []
    return (
      <main>
        <div className={this.state.registering ? 'fade' : ''}>
          <input type='text' placeholder='Username' />
          <input type='text' placeholder='Password' />
          <button>Login</button>
          <button onClick={this.changeRegistering}>Register</button>
        </div>
        <div className={this.state.registering ? 'registerPanel' : 'hidden'}>
          <input type='text' placeholder='Username' />
          <input type='text' placeholder='Email' />
          <input type='text' placeholder='Password' />
          <input type='text' placeholder='Repeat Password' />
          <button onClick={this.changeRegistering}>Close</button>
          <button>Register</button>
        </div>
      </main>
    )
  }
}
