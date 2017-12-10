import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import NumberHelper from '../models/NumberHelper'
import RedditUser from '../models/RedditUser'
import DateHelper from '../models/DateHelper'

class UserSummary extends Component {
  render() {
    const { username, linkKarma, commentKarma, created } = this.props
    return (
      <h2 className="subtitle">
        <span title={linkKarma}>
          {NumberHelper.format(linkKarma)} link karma
        </span>
        <span> &middot; </span>
        <span title={commentKarma}>
          {NumberHelper.format(commentKarma)} comment karma
        </span>
        <span> &middot; </span>
        <ExternalLink url={new RedditUser(username).url}>
          Redditor for {new DateHelper(created).timeSince()}
        </ExternalLink>
      </h2>
    )
  }
}

export default UserSummary
