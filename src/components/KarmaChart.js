import React, { Component } from 'react'
import { BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts'
import DateHelper from '../models/DateHelper'

const getChartData = (posts) => {
  const months = {}
  const result = []
  for (let i = posts.length - 1; i >= 0; i--) {
    const post = posts[i]
    const dateHelper = new DateHelper(post.date)
    const key = dateHelper.monthLabel()
    if (!(key in months)) {
      months[key] = []
    }
    months[key].push(post)
  }
  for (const key in months) {
    const [ month, year ] = key.split(' ')
    result.push({
      label: `${month.substring(0, 3)} ${year}`,
      points: months[key].map(post => post.points).reduce((acc, val) => acc + val)
    })
  }
  return result
}

class KarmaChart extends Component {
  render() {
    const data = getChartData(this.props.posts)
    return (
      <BarChart width={800} height={280} data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar name="Karma" dataKey="points" fill="#8884d8" />
      </BarChart>
    )
  }
}

export default KarmaChart
