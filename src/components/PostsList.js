import React, { Component } from 'react'
import PostDetails from './PostDetails'
import DateHelper from '../models/DateHelper'

class PostsList extends Component {
  render() {
    let prevMonth = null
    return (
      <ul>
        {this.props.posts.map(post => {
          const dateHelper = new DateHelper(post.date)
          const curMonth = dateHelper.month()
          const isSameMonth = dateHelper.isSameMonth(prevMonth)
          prevMonth = curMonth
          return (
            <li key={post.key} className="reddit-post-list-item">
              {isSameMonth ? '' : (
                <h3 className="month-header subtitle">{dateHelper.monthName()}</h3>
              )}
              <PostDetails post={post} />
            </li>
          )
        })}
      </ul>
    )
  }
}

export default PostsList
