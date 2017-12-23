export default class RedditPost {
  constructor(child) {
    const data = child.data
    this.url = `https://www.reddit.com${data.permalink}`
    this.title = data.title
    this.key = data.id
    this.subreddit = `/${data.subreddit_name_prefixed}`
    this.subredditUrl = `https://www.reddit.com/${data.subreddit_name_prefixed}`
    this.date = new Date(data.created * 1000)
    this.points = data.score
    this.pointsUnit = this.points === 1 ? 'point' : 'points'
    this.fullname = `${child.kind}_${data.id}`
    this.linkUrl = data.url
    if (this.linkUrl && this.linkUrl.indexOf('gfycat.com') > -1) {
      const url = new URL(this.linkUrl)
      const pathParts = url.pathname.split('/')
      const gfycatName = pathParts[pathParts.length - 1]
      this.thumbnailUrl = `https://thumbs.gfycat.com/${gfycatName}-size_restricted.gif`
    }
  }
}
