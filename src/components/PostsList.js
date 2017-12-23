import React, { Component } from 'react'
import PostDetails from './PostDetails'
import NumberHelper from '../models/NumberHelper'
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
        {months.map(month => {
          const posts = postsByMonth[month]
          const linkKarma = posts.reduce((acc, post) => acc + post.points, 0)
          const postCount = posts.length

          return (
            <div key={month} className="month-container">
              <h3 className="month-header subtitle">
                <span>{month}: </span>
                <span title={linkKarma}>
                  {NumberHelper.format(linkKarma)} link karma
                </span>
                <span> &middot; </span>
                <span title={postCount}>
                  {NumberHelper.format(postCount)} post{postCount === 1 ? '' : 's'}
                </span>
              </h3>
              <ul>
                {posts.map(post => (
                  <li key={post.key} className="reddit-post-list-item">
                    <PostDetails post={post} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PostsList
