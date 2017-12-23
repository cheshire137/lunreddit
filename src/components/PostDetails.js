import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import NumberHelper from '../models/NumberHelper'

class PostDetails extends Component {
  render() {
    const { post } = this.props
    const { url, title, points, subreddit, subredditUrl, linkUrl, thumbnailUrl,
            date, pointsUnit } = post
    return (
      <div>
        {thumbnailUrl ? (
          <ExternalLink
            url={linkUrl}
          >
            <img
              src={thumbnailUrl}
            />
          </ExternalLink>
        ) : ''}
        <p>
          <ExternalLink
            url={url}
            className="reddit-post-link"
          >{title}</ExternalLink>
        </p>
        <div className="is-size-7 text-gray">
          <ExternalLink
            url={url}
            className="text-gray"
          >{date.toLocaleDateString()}</ExternalLink>
          <span> &middot; </span>
          <span title={points}>
            <strong>{NumberHelper.format(points)}</strong> {pointsUnit}
          </span>
          <span> &middot; </span>
          <ExternalLink
            url={subredditUrl}
            className="text-gray"
          >{subreddit}</ExternalLink>
        </div>
      </div>
    )
  }
}

export default PostDetails
