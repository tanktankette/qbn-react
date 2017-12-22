import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import './Home.css'
/* global fetch */

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    let qualityRows = []
    if (this.props.qualities !== undefined) {
      for (const [id, value] of Object.entries(this.props.character.qualities)) {
        let masterQuality = this.props.qualities[id]
        let extraTitle = ''
        for (let extra of masterQuality['extra-titles']) {
          if (value > extra.value) extraTitle = extra.text
        }
        qualityRows.push(
          <section>
            <div>{masterQuality.title}: {value} - {extraTitle}</div> <br />
            <div>{masterQuality.description}</div>
          </section>
        )
      }
    }

    let storyletRows = []
    if (this.props.storylets !== undefined) {
      Object.keys(this.props.storylets).forEach((id) => {
        storyletRows.push(<RaisedButton onClick={this.props.changeLocation} value={id}>Go!</RaisedButton>)
      })
    }

    return (
      <MuiThemeProvider>
        <div class='button'>
          <RaisedButton label='Qualities' onClick={this.handleToggle} />
          {storyletRows}
        </div>
        <Drawer open={this.state.open}>
          {qualityRows}
        </Drawer>
      </MuiThemeProvider>
    )
  }
}
