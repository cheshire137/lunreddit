import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserSummary from './UserSummary'

class UserHeader extends Component {
  render() {
    const { username, about } = this.props
    return (
      <section className="hero is-link">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <Link to="/">Lunreddit</Link>
              <span> / </span>
              <Link to={`/user/${username}/year/${new Date().getFullYear()}`}>{username}</Link>
            </h1>
            {about ? <UserSummary {...about} username={username} /> : ''}
          </div>
        </div>
      </section>
    )
  }
}

export default UserHeader
