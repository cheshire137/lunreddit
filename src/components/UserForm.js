import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class UserForm extends Component {
  state = { user: '' }

  onSubmit(event) {
    event.preventDefault()
    if (this.state.user.trim().length < 1) {
      return
    }

    const year = new Date().getFullYear()
    this.props.history.push(`/user/${this.state.user}/year/${year}`)
  }

  onUserChange(event) {
    const input = event.target
    this.setState(prevState => ({ user: input.value }))
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div className="field">
          <label
            className="label"
            htmlFor="reddit-user"
          >Reddit user:</label>
          <input
            placeholder="User name"
            type="text"
            className="input"
            id="reddit-user"
            value={this.state.user}
            onChange={e => this.onUserChange(e)}
          />
        </div>
        <div className="field">
          <button
            type="submit"
            className="button is-primary"
          >View user</button>
        </div>
      </form>
    )
  }
}

export default withRouter(UserForm)
