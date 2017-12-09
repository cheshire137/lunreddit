import React, { Component } from 'react'
import ExternalLink from './ExternalLink'

class PostsList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={post.key} className="reddit-post-list-item">
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
          </li>
        ))}
      </ul>
    )
  }
}

export default PostsList
