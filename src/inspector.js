let React = require('react')
let extend = require('xtend')
let remapColors = require('rct1-remap-colors')

let arrow = require('./arrow')
let Button = require('./button')
let Preview = require('./preview')
let ColorSelect = require('./color-select')

let border = '1px solid black'
let style = {
  container: {
    width: 320,
    border: border,
    margin: '48px auto'
  },
  preview: {
    width: 320,
    height: 320,
    borderBottom: border
  },
  input: {
    border: border,
    background: 'white',
    verticalAlign: 'middle',
    height: 24,
    padding: 0,
    margin: 4,
  },
  textInput: {
    boxSizing: 'content-box',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '11pt'
  },
  controls: {
    display: '-webkit-flex'
  }
}

export default class Inspector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      idx: 61996,
      primaryColor: 24, // Red
      secondaryColor: 30 // Yellow
    }
  }

  render () {
    let skip = (n) => {
      return (ev) => {
        ev.preventDefault()
        this.setState({ idx: (this.state.idx + n) })
      }
    }
    let change = (ev) => {
      ev.preventDefault()
      this.setState({ idx: parseInt(ev.target.value) })
    }
    let colorChange = (id) => {
      return (colorId) => {
        this.setState({ [id]: colorId })
      }
    }

    return (
      <div style={style.container}>
        <Preview style={style.preview} graphics={this.props.graphics} idx={this.state.idx} primaryColor={this.state.primaryColor} secondaryColor={this.state.secondaryColor} />
        <div style={style.controls}>
          <Button style={style.input} onClick={skip(-1)}>{arrow('left')}</Button>
          <input style={extend(style.input, style.textInput)} onChange={change} value={this.state.idx} />
          <Button style={style.input} onClick={skip(1)}>{arrow('right')}</Button>
          <ColorSelect style={style.input} color={this.state.primaryColor} onChange={colorChange('primaryColor')} />
          <ColorSelect style={style.input} color={this.state.secondaryColor} onChange={colorChange('secondaryColor')} />
        </div>
      </div>
    )
  }
}
