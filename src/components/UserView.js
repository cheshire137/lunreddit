import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RedditUser from '../models/RedditUser'
import PostsList from './PostsList'
import KarmaChart from './KarmaChart'
import DateHelper from '../models/DateHelper'

class UserView extends Component {
  state = { posts: [] }

  constructor(props) {
    super(props)
    this.username = props.match.params.username
    this.year = props.match.params.year || new Date().getFullYear()
    this.redditUser = new RedditUser(this.username)
  }

  componentDidMount() {
    this.redditUser.about().then(about => {
      this.setState(prevState => ({ about }))
    })
    this.redditUser.annualPosts(this.year).then(posts => {
      this.setState(prevState => ({ posts }))
    })
  }

  render() {
    const { posts, about } = this.state
    return (
      <section className="section">
        <div className="container">
          <Link
            to="/"
            className="back-nav-link"
          >&larr; Select a user</Link>
          <h2 className="subtitle">
            {this.username}
            {about ? (
              <span className="text-gray">
                <span> &middot; </span>
                {about.linkKarma} link karma
                <span> / </span>
                {about.commentKarma} comment karma
                <span> &middot; </span>
                Redditor for {new DateHelper(about.created).timeSince()}
              </span>
            ) : ''}
          </h2>
          <KarmaChart posts={posts} />
          <PostsList posts={posts} />
        </div>
      </section>
    )
  }
}

export default withRouter(UserView)
