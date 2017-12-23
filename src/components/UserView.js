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
  state = { postsByYear: null, linkKarmaByYear: {} }

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
    this.redditUser = new RedditUser(this.username)
  }

  loadAnnualPosts(props) {
    const opts = {}
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
    const linkKarmaByYear = {}

    for (const post of data.posts) {
      const year = post.date.getFullYear()

      if (!(year in postsByYear)) {
        postsByYear[year] = []
      }
      if (!(year in linkKarmaByYear)) {
        linkKarmaByYear[year] = 0
      }

      postsByYear[year].push(post)
      linkKarmaByYear[year] += post.points
    }

    this.setState(prevState => ({
      postsByYear, after: data.after, before: data.before, count: data.count,
      linkKarmaByYear
    }))
  }

  render() {
    const { postsByYear, about, count, before, after, linkKarmaByYear } = this.state
    if (!postsByYear) {
      return (
        <div>
          <UserHeader username={this.username} />
          <section className="section">
            <div className="container">
              <p>Loading...</p>
            </div>
          </section>
        </div>
      )
    }

    const years = Object.keys(postsByYear).reverse()
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
              </ul>
            </nav>

            {years.map(year => {
              const posts = postsByYear[year]
              const linkKarma = linkKarmaByYear[year]

              return (
                <div key={year}>
                  <h2 className="subtitle">
                  <span>{year} on Reddit: </span>
                  <span title={linkKarma}>
                    {NumberHelper.format(linkKarma)} link karma
                  </span>
                  <span> &middot; </span>
                  <span title={posts.length}>
                    {NumberHelper.format(posts.length)} posts
                  </span>
                </h2>
                {posts.length > 0 ? (
                  <div>
                    <KarmaChart posts={posts} year={year} />
                    <PostsList posts={posts} />
                  </div>
                ) : ''}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(UserView)
