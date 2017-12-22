import React, { Component } from 'react'
// import RaisedButton from 'material-ui/RaisedButton'

export default class Choice extends Component {
  match (id) {
    let requirements = this.props.choice.requirements
    if (requirements === undefined) return true
    let qualities = this.props.character.qualities
    for (const requirement of Object.values(requirements)) {
      const characterValue = qualities[requirement.quality_id]
      const comparison = requirement.comparison
      if (characterValue === undefined) {
        if (comparison === 'GT' || (comparison === 'EQ' && requirement.value !== 0)) {
          return false
        }
      } else if ((comparison === 'GT' && characterValue <= requirement.value) ||
      (comparison === 'LT' && characterValue >= requirement.value) ||
      (comparison === 'EQ' && characterValue !== requirement.value)) {
        return false
      }
    }
    return true
  }

  render () {
    return (
      <div>
        {this.props.choice.text} <br />
        <button disabled={!this.match(this.props.id)} onClick={this.props.changeCharacter} value={this.props.id}>Go!</button>
      </div>
    )
  }
}
