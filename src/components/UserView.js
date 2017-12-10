import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RedditUser from '../models/RedditUser'
import PostsList from './PostsList'
import ExternalLink from './ExternalLink'
import KarmaChart from './KarmaChart'
import UserSummary from './UserSummary'
import DateHelper from '../models/DateHelper'
import NumberHelper from '../models/NumberHelper'

class UserView extends Component {
  state = { posts: [] }

  constructor(props) {
    super(props)
    const params = props.match.params
    this.username = params.username
    this.year = parseInt(params.year, 10)
    this.redditUser = new RedditUser(this.username)
  }

  componentWillReceiveProps(props) {
    const params = props.match.params
    this.username = params.username
    this.year = parseInt(params.year, 10)
    this.redditUser = new RedditUser(this.username)
    this.loadAnnualPosts()
  }

  componentDidMount() {
    this.redditUser.about().then(about => this.onAboutLoaded(about))
    this.loadAnnualPosts()
  }

  loadAnnualPosts() {
    this.redditUser.annualPosts({ year: this.year }).then(posts => this.onPostsLoaded(posts))
  }

  onAboutLoaded(about) {
    this.setState(prevState => ({ about }))
  }

  onPostsLoaded(posts) {
    this.setState(prevState => ({ posts }))
  }

  render() {
    const { posts, about } = this.state
    const totalLinkKarma = posts.map(post => post.points).reduce((acc, val) => acc + val, 0)
    const prevYear = this.year - 1
    const showPrevYear = about && about.years.indexOf(prevYear) > -1
    const nextYear = this.year + 1
    const showNextYear = about && about.years.indexOf(nextYear) > -1

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
              {about ? <UserSummary {...about} username={this.username} /> : ''}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <nav className="tabs is-boxed">
              <ul>
                <li>
                  <Link
                    to="/"
                    className="back-nav-link"
                  >&larr; Select a user</Link>
                </li>
                {showPrevYear ? (
                  <li>
                    <Link
                      to={`/user/${this.username}/year/${prevYear}`}
                    >{prevYear}</Link>
                  </li>
                ) : ''}
                {showNextYear ? (
                  <li>
                    <Link
                      to={`/user/${this.username}/year/${nextYear}`}
                    >{nextYear}</Link>
                  </li>
                ) : ''}
              </ul>
            </nav>
            <h2 className="subtitle">
              <span>{this.year} on Reddit: </span>
              <span title={totalLinkKarma}>
                {NumberHelper.format(totalLinkKarma)} link karma
              </span>
              <span> &middot; </span>
              <span title={posts.length}>
                {NumberHelper.format(posts.length)} posts
              </span>
            </h2>
            {posts.length > 0 ? (
              <div>
                <KarmaChart posts={posts} year={this.year} />
                <PostsList posts={posts} />
              </div>
            ) : ''}
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(UserView)
