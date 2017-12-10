import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RedditUser from '../models/RedditUser'
import PostsList from './PostsList'
import ExternalLink from './ExternalLink'
import KarmaChart from './KarmaChart'
import DateHelper from '../models/DateHelper'
import NumberHelper from '../models/NumberHelper'

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
    const totalLinkKarma = posts.map(post => post.points).reduce((acc, val) => acc + val, 0)
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
                  <span title={about.linkKarma}>
                    {NumberHelper.format(about.linkKarma)} link karma
                  </span>
                  <span> &middot; </span>
                  <span title={about.commentKarma}>
                    {NumberHelper.format(about.commentKarma)} comment karma
                  </span>
                  <span> &middot; </span>
                  <ExternalLink url={this.redditUser.url}>
                    Redditor for {new DateHelper(about.created).timeSince()}
                  </ExternalLink>
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
            <h2 className="subtitle">
              <span>{this.year} on Reddit: </span>
              <span title={totalLinkKarma}>
                {NumberHelper.format(totalLinkKarma)} link karma
              </span>
            </h2>
            <KarmaChart posts={posts} year={this.year} />
            <PostsList posts={posts} />
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(UserView)
