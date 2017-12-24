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
  render() {
    const { posts, year } = this.props
    const linkKarmaBySubreddit = getLinkKarmaBySubreddit(posts)
    const subreddits = sortedSubreddits(linkKarmaBySubreddit)

    return (
      <div className="karma-breakdown">
        <h3 className="subtitle">{year} by Subreddit</h3>
        <ul>
          {subreddits.map(subreddit => {
            const points = linkKarmaBySubreddit[subreddit]
            const pointsUnit = points === 1 ? 'point' : 'points'

            return (
              <li key={subreddit}>
                <ExternalLink
                  url={`https://www.reddit.com${subreddit}`}
                >{subreddit} </ExternalLink>
                <span title={points}>
                  <strong>{NumberHelper.format(points)}</strong>&nbsp;{pointsUnit}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default KarmaBreakdown
