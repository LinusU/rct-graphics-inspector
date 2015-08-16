let React = require('react')
let extend = require('xtend')
let remapColors = require('rct1-remap-colors')
let wasEventOutsideElement = require('was-event-outside-element')

let arrow = require('./arrow')
let Button = require('./button')

let style = {
  container: {
    border: '1px solid black',
    display: '-webkit-flex',
    minWidth: 80,
    position: 'relative'
  },
  selectedColor: {
    WebkitFlex: '1'
  },
  button: {
    borderLeft: '1px solid black'
  },
  select: {
    border: '1px solid black',
    position: 'absolute',
    width: '100%',
    top: -200,
    left: -1,
    zIndex: 9000
  },
  option: {
    height: 20
  }
}

export default class ColorSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount () {
    let listener = (ev) => {
      let root = React.findDOMNode(this.refs.root)
      if (wasEventOutsideElement(ev, root)) this.setState({ open: false })
    }

    document.addEventListener('click', listener)
    this.setState({ listener })
  }

  componentWillUnmount () {
    document.removeEventListener('click', listener)
  }

  renderList () {
    let list = remapColors.map((color, colorId) => {
      let click = (ev) => {
        this.setState({ open: false })
        this.props.onChange(colorId)
      }
      let s = extend(style.option, {
        backgroundColor: 'rgb(' + color.displayColor + ')'
      })

      return (
        <div onClick={click} style={s}></div>
      )
    })

    return (
      <div style={style.select}>{list}</div>
    )
  }

  render () {
    let list
    if (this.state.open) {
      list = this.renderList()
    }

    let open = (ev) => {
      ev.preventDefault()
      this.setState({ open: true })
    }

    let selectedStyle = {
      backgroundColor: 'rgb(' + remapColors[this.props.color].displayColor + ')'
    }

    return (
      <div style={extend(style.container, this.props.style)} ref='root'>
        <div style={extend(selectedStyle, style.selectedColor)}></div>
        <Button style={style.button} onClick={open}>{arrow('down')}</Button>
        {list}
      </div>
    )
  }
}
