import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RedditUser from '../models/RedditUser'
import PostsList from './PostsList'
import ExternalLink from './ExternalLink'
import KarmaChart from './KarmaChart'
import DateHelper from '../models/DateHelper'
import NumberHelper from '../models/NumberHelper'
import UserHeader from './UserHeader'

class UserView extends Component {
  state = { postsByYear: null }

  constructor(props) {
    super(props)
    this.gotProps(props)
  }

  componentWillReceiveProps(props) {
    this.gotProps(props)
    this.loadAnnualPosts(props)
  }

  componentDidMount() {
    this.redditUser.about().then(about => this.onAboutLoaded(about))
    this.loadAnnualPosts(this.props)
  }

  gotProps(props) {
    const params = props.match.params
    this.username = params.username
    this.year = parseInt(params.year, 10)
    this.redditUser = new RedditUser(this.username)
  }

  loadAnnualPosts(props) {
    const opts = { year: this.year }
    const params = props.match.params
    if (params.before) {
      opts.before = params.before
    }
    if (params.after) {
      opts.after = params.after
    }
    if (params.count) {
      opts.count = parseInt(params.count, 10)
    }
    this.redditUser.annualPosts(opts).then(data => this.onPostsLoaded(data))
  }

  onAboutLoaded(about) {
    this.setState(prevState => ({ about }))
  }

  onPostsLoaded(data) {
    const postsByYear = {}
    for (const post of data.posts) {
      const year = post.date.getFullYear()
      if (!(year in postsByYear)) {
        postsByYear[year] = []
      }
      postsByYear[year].push(post)
    }
    this.setState(prevState => ({
      postsByYear, after: data.after, before: data.before, count: data.count
    }))
  }

  render() {
    const { postsByYear, about, count, before, after } = this.state
    if (!postsByYear) {
      return <p>Loading...</p>
    }
    const years = Object.keys(postsByYear)
    if (years.length < 1) {
      return (
        <div>
          <UserHeader username={this.username} about={about} />
          <section className="section">
            <div className="container">
              <p>No posts found</p>
            </div>
          </section>
        </div>
      )
    }

    const totalLinkKarma = posts.map(post => post.points).reduce((acc, val) => acc + val, 0)
    const prevYear = this.year - 1
    const showPrevYear = about && about.years.indexOf(prevYear) > -1
    const nextYear = this.year + 1
    const showNextYear = about && about.years.indexOf(nextYear) > -1
    let pageChunk = ''
    if (before) {
      pageChunk = `before/${before}/`
    } else if (after) {
      pageChunk = `after/${after}/`
    }
    const prevYearUrl = `/user/${this.username}/${pageChunk}${count}/year/${prevYear}`
    const nextYearUrl = `/user/${this.username}/${pageChunk}${count}/year/${nextYear}`

    return (
      <div>
        <UserHeader username={this.username} about={about} />
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
                    <Link to={prevYearUrl}>{prevYear}</Link>
                  </li>
                ) : ''}
                {showNextYear ? (
                  <li>
                    <Link to={nextYearUrl}>{nextYear}</Link>
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
