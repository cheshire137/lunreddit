import React, { Component } from 'react'

class ExternalLink extends Component {
  render() {
    return (
      <a
        href={this.props.url}
        className={this.props.className}
        target="_blank"
        rel="noopener noreferrer"
      >{this.props.children}</a>
    )
  }
}

export default ExternalLink
