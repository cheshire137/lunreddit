import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import PostDetails from './PostDetails'

class PostsList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={post.key} className="reddit-post-list-item">
            <PostDetails post={post} />
          </li>
        ))}
      </ul>
    )
  }
}

export default PostsList
