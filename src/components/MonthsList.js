import React, { Component } from 'react'
import YearSummary from './YearSummary'
import KarmaChart from './KarmaChart'
import PostsList from './PostsList'
import KarmaBreakdown from './KarmaBreakdown'

class MonthsList extends Component {
  state = { subreddit: null }

  onSubredditChange(subreddit) {
    this.setState(prevState => ({ subreddit }))
  }

  render() {
    const { posts, year, linkKarma } = this.props
    const { subreddit } = this.state

    return (
      <div>
        <YearSummary
          postCount={posts.length}
          year={year}
          linkKarma={linkKarma}
        />
        <KarmaChart posts={posts} year={year} />
        <div className="columns">
          <div className="column is-three-quarters">
            <PostsList posts={posts} subreddit={subreddit} />
          </div>
          <div className="column">
            <KarmaBreakdown
              posts={posts}
              year={year}
              activeSubreddit={subreddit}
              onSubredditChange={s => this.onSubredditChange(s)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MonthsList
