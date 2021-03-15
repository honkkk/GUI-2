import React, { Component } from "react"

import {game, dice, clock} from "./icons.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello World!
            {game()}
            {dice()}
            {clock()}
          </p>
        </header>
      </div>
    )
  }
}

export default App
