import React, { Component } from 'react'
import YearSummary from './YearSummary'
import KarmaChart from './KarmaChart'
import PostsList from './PostsList'

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
        {posts.length > 0 ? (
          <div>
            <KarmaChart posts={posts} year={year} />
            <PostsList posts={posts} />
          </div>
        ) : ''}
      </div>
    )
  }
}

export default MonthsList
