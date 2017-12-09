import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RedditUser from '../models/RedditUser'
import PostsList from './PostsList'

class UserView extends Component {
  state = { posts: [] }

  constructor(props) {
    super(props)
    this.username = props.match.params.username
    this.redditUser = new RedditUser(this.username)
  }

  componentDidMount() {
    this.redditUser.posts().then(posts => {
      this.setState(prevState => ({ posts }))
    })
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <Link
            to="/"
            className="back-nav-link"
          >&larr; Select a user</Link>
          <h2 className="subtitle">{this.username}</h2>
          <PostsList posts={this.state.posts} />
        </div>
      </section>
    )
  }
}

export default withRouter(UserView)
