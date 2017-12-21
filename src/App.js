import React, { Component } from 'react'
import Home from './Home'
import './App.css'
/* global fetch */

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
      <Home
        character={this.state.character}
        qualities={this.state.qualities}
        storylets={this.state.storylets}
        changeLocation={this.changeLocation}
      />
    )
  }
}

export default App
