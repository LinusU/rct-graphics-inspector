let React = require('react')
let extend = require('xtend')

let remapColors = require('rct1-remap-colors')

let style = {
  preview: {
    display: '-webkit-flex',
    WebkitAlignItems: 'center',
    WebkitJustifyContent: 'center'
  },
  canvas: {
    WebkitFlex: 'none'
  }
}

function computeState (props) {
  let { graphics, idx, paletteIdx } = props

  return {
    info: graphics.loadInfoAtIndex(idx),
    bitmap: graphics.loadDataAtIndex(idx),
    palette: graphics.loadDataAtIndex(paletteIdx)
  }
}

export default class Preview extends React.Component {
  constructor (props) {
    super(props)

    this.state = computeState(props)
  }

  componentDidMount () { this.drawBitmap() }
  componentDidUpdate () { this.drawBitmap() }

  componentWillReceiveProps (nextProps) {
    this.setState(computeState(nextProps))
  }

  drawBitmap () {
    let { info, bitmap, palette } = this.state
    let canvas = React.findDOMNode(this.refs.canvas)
    let primaryRemap = remapColors[this.props.primaryColor].colors
    let secondaryRemap = remapColors[this.props.secondaryColor].colors

    canvas.width = info.width
    canvas.height = info.height

    canvas.style.width = info.width + 'px'
    canvas.style.height = info.height + 'px'

    let ctx = canvas.getContext('2d')

    for (let i = 0; i < bitmap.length; i++) {
      if (bitmap[i] === 0) continue

      let x = (i % info.width) | 0
      let y = (i / info.width) | 0
      let p = bitmap[i]

      let rgb
      if (p >= 0xCA && p <= 0xD5) {
        rgb = secondaryRemap[p - 0xCA]
      } else if (p >= 0xF3 && p <= 0xFE) {
        rgb = primaryRemap[p - 0xF3]
      } else {
        rgb = palette.get(bitmap[i])
      }

      if (!rgb) {
        console.log('MISSING PALETTE COLOR')
        console.log('i, p', i, p)
        console.log('x, y', x, y)
        rgb = [ 255, 0, 0 ]
      }

      ctx.fillStyle = 'rgb(' + rgb.join(', ') + ')'
      ctx.fillRect(x, y, 1, 1)
    }
  }

  render () {
    return (
      <div style={extend(style.preview, this.props.style)}>
        <canvas style={style.canvas} ref='canvas' />
      </div>
    )
  }
}

Preview.defaultProps = {
  paletteIdx: 2024
}
