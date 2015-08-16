let React = require('react')
var RCTGraphics = require('rct-graphics')

let Inspector = require('./inspector')
let DropTarget = require('./drop-target')

class App extends React.Component {
  constructor () {
    super()
    this.state = { hasFiles: false }
  }
  render () {
    if (this.state.hasFiles === false) {
      let onFiles = (files) => {
        let graphics = new RCTGraphics(files)

        this.setState({ hasFiles: true, graphics })
      }

      return <DropTarget onFiles={onFiles} />
    }

    return <Inspector graphics={this.state.graphics} />
  }
}

let div = document.createElement('div')
document.body.appendChild(div)
React.render(<App />, div)
