import React, { Component } from 'react'
import NumberHelper from '../models/NumberHelper'

class YearSummary extends Component {
  render() {
    const { year, linkKarma, postCount } = this.props
    return (
      <h2 className="subtitle">
        <span>{year} on Reddit: </span>
        <span title={linkKarma}>
          {NumberHelper.format(linkKarma)} link karma
        </span>
        <span> &middot; </span>
        <span title={postCount}>
          {NumberHelper.format(postCount)} post{postCount === 1 ? '' : 's'}
        </span>
      </h2>
    )
  }
}

export default YearSummary
