import Fetcher from './Fetcher'
import RedditPost from './RedditPost'

class RedditUser extends Fetcher {
  constructor(username) {
    super('https://www.reddit.com')
    this.username = username
    this.url = `https://www.reddit.com/u/${this.username}`
  }

  async about() {
    const path = `/user/${this.username}/about.json`
    const resp = await this.get(path)
    const data = resp.data
    return {
      created: new Date(data.created * 1000),
      linkKarma: data.link_karma,
      commentKarma: data.comment_karma
    }
  }

  async posts(opts) {
    opts = opts || {}
    const limit = opts.limit || 10
    const path = `/user/${this.username}/submitted.json?limit=${limit}`
    const resp = await this.get(path)
    return resp.data.children.map(child => new RedditPost(child.data))
  }

  async annualPosts(year) {
    if (!year) {
      return []
    }
    const cutoff = new Date(year, 0, 1).getTime() / 1000
    const path = `/user/${this.username}/submitted.json?sort=new&t=year`
    const resp = await this.get(path)
    const rawPosts = resp.data.children.map(child => child.data)
    const yearPosts = rawPosts.filter(post => post.created >= cutoff)
    return yearPosts.map(post => new RedditPost(post))
  }
}

export default RedditUser
