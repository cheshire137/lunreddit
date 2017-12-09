export default class RedditPost {
  constructor(data) {
    console.log(data)
    this.url = `https://www.reddit.com${data.permalink}`
    this.title = data.title
    this.key = data.id
    this.subreddit = `/${data.subreddit_name_prefixed}`
    this.subredditUrl = `https://www.reddit.com/${data.subreddit_name_prefixed}`
    this.date = new Date(data.created * 1000)
    this.points = data.score
    this.pointsUnit = this.points === 1 ? 'point' : 'points'
  }
}
