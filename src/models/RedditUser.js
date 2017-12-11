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
    const limit = 100

    let path = `/user/${this.username}/submitted.json?sort=new&t=year&limit=${limit}`
    if (opts.before) {
      path = `${path}&before=${opts.before}`
    }
    if (opts.after) {
      path = `${path}&after=${opts.after}`
    }
    let count = 0
    if (opts.count) {
      count += opts.count
      path = `${path}&count=${count}`
    }
    count += limit
    const resp = await this.get(path)
    const { before, after } = resp.data

    return {
      posts: resp.data.children.map(child => new RedditPost(child)),
      after,
      before,
      count
    }
  }
}

export default RedditUser
