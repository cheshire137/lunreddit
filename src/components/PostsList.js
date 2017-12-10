import React, { Component } from 'react'
import PostDetails from './PostDetails'
import DateHelper from '../models/DateHelper'

const getPostsByMonth = (posts) => {
  const result = {}
  for (const post of posts) {
    const dateHelper = new DateHelper(post.date)
    const month = dateHelper.monthName()
    if (!(month in result)) {
      result[month] = []
    }
    result[month].push(post)
  }
  return result
}

class PostsList extends Component {
  render() {
    const postsByMonth = getPostsByMonth(this.props.posts)
    const months = Object.keys(postsByMonth)
    return (
      <div>
        {months.map(month => (
          <div>
            <h3 className="month-header subtitle">
              {month} ({postsByMonth[month].length})
            </h3>
            <ul>
              {postsByMonth[month].map(post => (
                <li key={post.key} className="reddit-post-list-item">
                  <PostDetails post={post} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default PostsList
