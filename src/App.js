import React, { Component } from 'react'
import Registration from './Registration'
import Home from './Home'
import './App.css'
/* global fetch */

require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      character: {
        name: 'test',
        qualities: [
          {
            id: 0,
            value: 3
          }
        ]
      }
    }
    this.changeLocation = this.changeLocation.bind(this)
    this.loadCharacter = this.loadCharacter.bind(this)
  }

  loadCharacter (newCharacter) {
    if (newCharacter.qualities === undefined) newCharacter.qualities = []
    this.setState({character: newCharacter})
  }

  changeLocation (e) {
    this.setState({location: e.target.value})
  }

  componentWillMount () {
    fetch('https://qbn-react.firebaseio.com/qualities.json')
      .then(res => res.json())
      .then(data => this.setState({qualities: data}))
    fetch('https://qbn-react.firebaseio.com/storylets.json')
      .then(res => res.json())
      .then(data => this.setState({storylets: data}))
  }

  render () {
    return (
    <section>
      <Registration changeCharacte={this.loadCharacter} />
      <Home
        character={this.state.character}
        qualities={this.state.qualities}
        storylets={this.state.storylets}
        changeLocation={this.changeLocation}
      />
    </section>
    )
  }
}

export default App
