let React = require('react')
var dragDrop = require('drag-drop/buffer')

const RE_DATA = /csg1.dat$/i
const RE_INDEX = /csg1i.dat$/i

let style = {
  width: 320 + 2 - 8,
  height: 320 + 35 + 2 - 8,
  border: '4px dashed black',
  borderRadius: 12,
  margin: '48px auto',
  display: '-webkit-flex',
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'center'
}

export default class DropTarget extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    let srcIndex, srcData
    let target = React.findDOMNode(this.refs.target)
    let unbind = dragDrop(target, (files) => {
      files.forEach(function (file) {
        if (RE_DATA.test(file.name)) srcData = file
        if (RE_INDEX.test(file.name)) srcIndex = file
      })

      if (srcData && srcIndex) {
        unbind()
        this.props.onFiles({ srcIndex, srcData })
      }
    })
  }
  render () {
    return (
      <div style={style} ref="target">
        <p>Please drop <code>csg1.dat</code> and <code>csg1i.dat</code> here</p>
      </div>
    )
  }
}
