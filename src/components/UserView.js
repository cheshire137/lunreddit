import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class UserView extends Component {
  render() {
    const username = this.props.match.params.username
    return (
      <div>
        User: {username}
      </div>
    )
  }
}

export default withRouter(UserView)
