import React, { Component } from 'react'
import Registration from './Registration'
import Home from './Home'
import Storylet from './Storylet'
import './App.css'
/* global fetch */

require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: -2,
      character: {
        name: 'test',
        qualities: {
          0: 3
        }
      }
    }
    this.changeLocation = this.changeLocation.bind(this)
    this.changeCharacter = this.changeCharacter.bind(this)
    this.loadCharacter = this.loadCharacter.bind(this)
  }

  loadCharacter (newCharacter) {
    if (newCharacter.qualities === undefined) newCharacter.qualities = {0: 1}
    this.setState({character: newCharacter})
  }

  changeCharacter (e) {
    let character = this.state.character
    const choice = this.state.storylets[this.state.location].choices[e.target.value]
    let effects = choice.effects
    for (const effect of effects) {
      if (effect.adjust === '=' || (effect.adjust === '+' && character.qualities[e.target.value] === undefined)) {
        character.qualities[e.target.value] = effect.value
      } else if (effect.adjust === '+') {
        character.qualities[e.target.value] += effect.value
      } else if (effect.adjust === '-' && character.qualities[e.target.value] > effect.value) {
        character.qualities[e.target.value] -= effect.value
      } else {
        character.qualities[e.target.value] = undefined
      }
    }
    this.setState({character: character})
    this.changeLocation({target: {value: choice.link}})
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
    if (this.state.storylets !== undefined) {
      if (this.state.location === -2) {
        return (
          <Registration loadCharacter={this.loadCharacter} changeLocation={this.changeLocation} />
        )
      } else if (this.state.location === -1) {
        return (
          <Home
            character={this.state.character}
            qualities={this.state.qualities}
            storylets={this.state.storylets}
            changeLocation={this.changeLocation}
          />
        )
      } else {
        return (
          <Storylet storylet={this.state.storylets[this.state.location]}
            changeLocation={this.changeLocation}
            qualities={this.state.qualities}
            character={this.state.character}
            changeCharacter={this.changeCharacter}
          />
        )
      }
    } else {
      return (
        <div>loading</div>
      )
    }
  }
}

export default App
