import React, { Component } from 'react'
import YearSummary from './YearSummary'
import KarmaChart from './KarmaChart'
import PostsList from './PostsList'
import KarmaBreakdown from './KarmaBreakdown'

class MonthsList extends Component {
  render() {
    const { posts, year, linkKarma } = this.props

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
            <PostsList posts={posts} />
          </div>
          <div className="column">
            <KarmaBreakdown posts={posts} year={year} />
          </div>
        </div>
      </div>
    )
  }
}

export default MonthsList
