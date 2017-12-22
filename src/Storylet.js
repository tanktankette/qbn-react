import React, { Component } from 'react'
import Choice from './Choice'

export default class Storylet extends Component {
  render () {
    let rows = []
    for (const [key, value] of Object.entries(this.props.storylet.choices)) {
      rows.push(
        <Choice
          id={key}
          choice={value}
          qualities={this.props.qualities}
          changeLocation={this.props.changeLocation}
          changeCharacter={this.props.changeCharacter}
          character={this.props.character}
        />
      )
    }

    return (
      <main>
        {this.props.storylet.text} <br />
        {rows}
      </main>
    )
  }
}
