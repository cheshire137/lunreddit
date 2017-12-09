import React, { Component } from 'react'
import ExternalLink from './ExternalLink'

class PostsList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={post.key}>
            <p><ExternalLink url={post.url}>{post.title}</ExternalLink></p>
            <div className="is-size-7">
              <ExternalLink url={post.subredditUrl}>{post.subreddit}</ExternalLink>
              <span> &middot; </span>
              {post.date.toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default PostsList
