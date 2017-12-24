import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import NumberHelper from '../models/NumberHelper'

const getLinkKarmaBySubreddit = (posts) => {
  const result = {}
  for (const post of posts) {
    const subreddit = post.subreddit
    if (!(subreddit in result)) {
      result[subreddit] = 0
    }
    result[subreddit] += post.points
  }
  return result
}

const sortedSubreddits = (linkKarmaBySubreddit) => {
  const compare = (a, b) => {
    const karmaA = linkKarmaBySubreddit[a]
    const karmaB = linkKarmaBySubreddit[b]
    if (karmaA < karmaB) {
      return -1
    }
    return karmaA > karmaB ? 1 : 0
  }
  return Object.keys(linkKarmaBySubreddit).sort(compare).reverse()
}

class KarmaBreakdown extends Component {
  onSubredditClick(subreddit) {
    const { onSubredditChange, activeSubreddit } = this.props
    if (activeSubreddit === subreddit) {
      onSubredditChange(null)
    } else {
      onSubredditChange(subreddit)
    }
  }

  render() {
    const { posts, year, activeSubreddit } = this.props
    const linkKarmaBySubreddit = getLinkKarmaBySubreddit(posts)
    const subreddits = sortedSubreddits(linkKarmaBySubreddit)

    return (
      <div className="karma-breakdown">
        <h3 className="subtitle">{year} by Subreddit</h3>
        <ul>
          {subreddits.map(subreddit => {
            const points = linkKarmaBySubreddit[subreddit]
            const pointsUnit = points === 1 ? 'point' : 'points'
            const isActive = activeSubreddit === subreddit
            const className = (isActive ? 'is-info' : 'is-white') + ' button'

            return (
              <li key={subreddit}>
                <button
                  type="button"
                  className={className}
                  onClick={() => this.onSubredditClick(subreddit)}
                >
                  <span>{subreddit}</span>
                  <span title={points} className="pl-2">
                    <strong>{NumberHelper.format(points)}</strong>&nbsp;{pointsUnit}
                  </span>
                  {isActive ? (
                    <span className="text-bold pl-2">&times;</span>
                  ) : ''}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default KarmaBreakdown
