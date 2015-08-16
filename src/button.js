let React = require('react')
let extend = require('xtend')

let style = {
  minWidth: 24,
  display: '-webkit-flex',
  WebkitAlignItems: 'center',
  WebkitJustifyContent: 'center'
}

export default class Button extends React.Component {
  render () {
    return (
      <div style={extend(style, this.props.style)} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}
