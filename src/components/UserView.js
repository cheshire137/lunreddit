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
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Link to="/">Lunreddit</Link>
                <span> / </span>
                <Link to={`/user/${this.username}`}>{this.username}</Link>
              </h1>
              {about ? (
                <h2 className="subtitle">
                  {about.linkKarma} link karma
                  <span> &middot; </span>
                  {about.commentKarma} comment karma
                  <span> &middot; </span>
                  Redditor for {new DateHelper(about.created).timeSince()}
                </h2>
              ) : ''}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Link
              to="/"
              className="back-nav-link"
            >&larr; Select a user</Link>
            <KarmaChart posts={posts} />
            <PostsList posts={posts} />
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(UserView)
