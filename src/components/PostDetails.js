import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import NumberHelper from '../models/NumberHelper'

class PostDetails extends Component {
  render() {
    const { post } = this.props
    const { url, title, points, subreddit, subredditUrl, linkUrl, thumbnailUrl,
            date, pointsUnit, domain, domainUrl, comments, commentsUnit } = post
    const thumbnailStyle = {
      backgroundImage: thumbnailUrl ? `url("${thumbnailUrl}")` : ''
    }

    return (
      <div className="d-flex">
        {thumbnailUrl ? (
          <ExternalLink
            url={linkUrl}
            style={thumbnailStyle}
            className="mr-3 reddit-post-thumbnail-link d-block flex-shrink-0"
          >
            <img src={thumbnailUrl} alt={title} />
          </ExternalLink>
        ) : ''}
        <div>
          <p>
            <ExternalLink
              url={linkUrl ? linkUrl : url}
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
              url={url}
              className="text-gray"
              title={comments}
            >
              <strong>{NumberHelper.format(comments)}</strong> {commentsUnit}
            </ExternalLink>
            <span> &middot; </span>
            <ExternalLink
              url={subredditUrl}
              className="text-gray"
            >{subreddit}</ExternalLink>
            {domainUrl ? (
              <span>
                <span> &middot; </span>
                <ExternalLink
                  url={domainUrl}
                  className="text-gray"
                >{domain}</ExternalLink>
              </span>
            ) : ''}
            {linkUrl ? (
              <span>
                <span> &middot; </span>
                <ExternalLink
                  url={url}
                  className="text-gray"
                >View comments</ExternalLink>
              </span>
            ) : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default PostDetails
