import Fetcher from './Fetcher'
import RedditPost from './RedditPost'

class RedditUser extends Fetcher {
  constructor(username) {
    super('https://www.reddit.com')
    this.username = username
    this.url = `https://www.reddit.com/u/${this.username}`
  }

  yearsSince(date) {
    const curYear = new Date().getFullYear()
    const pastYear = date.getFullYear()
    const years = []
    for (let year = curYear; year > pastYear; year--) {
      years.push(year)
    }
    return years
  }

  async about() {
    const path = `/user/${this.username}/about.json`
    const resp = await this.get(path)
    const data = resp.data
    const createdDate = new Date(data.created * 1000)
    return {
      created: createdDate,
      linkKarma: data.link_karma,
      commentKarma: data.comment_karma,
      years: this.yearsSince(createdDate)
    }
  }

  async annualPosts(opts) {
    opts = opts || {}
    const year = opts.year
    if (!year) {
      return []
    }

    const startCutoff = new Date(year, 0, 1).getTime() / 1000
    const endCutoff = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000
    const path = `/user/${this.username}/submitted.json?sort=new&t=year`
    const resp = await this.get(path)
    const rawPosts = resp.data.children.map(child => child.data)
    const yearPosts = rawPosts.filter(post => {
      return post.created >= startCutoff && post.created <= endCutoff
    })
    return yearPosts.map(post => new RedditPost(post))
  }
}

export default RedditUser
