import React, { Component } from 'react'
import Registration from './Registration'
import './App.css'

require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      character: undefined
    }
    this.changeCharacter = this.changeCharacter.bind(this)
  }

  changeCharacter (newCharacter) {
    if (newCharacter.qualities === undefined) newCharacter.qualities = []
    this.setState({character: newCharacter})
  }

  render () {
    return (
      <Registration changeCharacte={this.changeCharacter} />
    )
  }
}

export default App
