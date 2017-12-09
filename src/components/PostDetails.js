import React, { Component } from 'react'
import ExternalLink from './ExternalLink'

class PostDetails extends Component {
  render() {
    const { post } = this.props
    return (
      <div>
        <p>
          <ExternalLink
            url={post.url}
            className="reddit-post-link"
          >{post.title}</ExternalLink>
        </p>
        <div className="is-size-7 text-gray">
          <ExternalLink
            url={post.url}
            className="text-gray"
          >{post.date.toLocaleDateString()}</ExternalLink>
          <span> &middot; </span>
          <strong>{post.points}</strong> {post.pointsUnit}
          <span> &middot; </span>
          <ExternalLink
            url={post.subredditUrl}
            className="text-gray"
          >{post.subreddit}</ExternalLink>
        </div>
      </div>
    )
  }
}

export default PostDetails
