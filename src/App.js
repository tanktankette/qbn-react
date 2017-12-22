import React, { Component } from 'react'
<<<<<<< HEAD
import Registration from './Registration'
import Home from './Home'
import './App.css'
/* global fetch */

require('es6-promise').polyfill()
require('isomorphic-fetch')
=======
import Storylet from './Storylet'
import './App.css'
/* global fetch */
>>>>>>> storylet

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< HEAD
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
=======
      location: 2,
      character: {
        name: 'test',
        qualities: {
          0: 3
        }
      }
    }
    this.changeLocation = this.changeLocation.bind(this)
    this.changeCharacter = this.changeCharacter.bind(this)
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
>>>>>>> storylet
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
<<<<<<< HEAD
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
=======
    if (this.state.storylets !== undefined && this.state.location !== -1) {
      return (
        <Storylet storylet={this.state.storylets[this.state.location]}
          changeLocation={this.changeLocation}
          qualities={this.state.qualities}
          character={this.state.character}
          changeCharacter={this.changeCharacter}
        />
      )
    } else {
      return (
        <div>loading</div>
      )
    }
>>>>>>> storylet
  }
}

export default App
