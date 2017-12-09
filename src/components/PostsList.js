import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import PostDetails from './PostDetails'

const monthNames = ['January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October',
                    'November', 'December']

class PostsList extends Component {
  render() {
    let prevMonth = null
    return (
      <ul>
        {this.props.posts.map(post => {
          const curMonth = post.month
          const isSameMonth = prevMonth && curMonth.getTime() === prevMonth.getTime()
          prevMonth = curMonth
          const monthTitle = `${monthNames[curMonth.getMonth()]} ${curMonth.getFullYear()}`
          return (
            <li key={post.key} className="reddit-post-list-item">
              {isSameMonth ? '' : (
                <h3 className="month-header subtitle">{monthTitle}</h3>
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
