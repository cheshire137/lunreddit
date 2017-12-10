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
    if (typeof year !== 'number' || isNaN(year)) {
      return []
    }

    const startCutoff = new Date(year, 0, 1).getTime() / 1000
    const endCutoff = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000

    let path = `/user/${this.username}/submitted.json?sort=new&t=year&limit=100`
    if (opts.before) {
      path = `${path}&before=${opts.before}`
    }
    if (opts.after) {
      path = `${path}&after=${opts.after}`
    }
    const resp = await this.get(path)
    console.log(path)
    console.log(year, resp.data.children.map(child => new Date(child.data.created * 1000).getFullYear()))

    const yearPosts = resp.data.children.filter(child => {
      const post = child.data
      return post.created >= startCutoff && post.created <= endCutoff
    })
    return yearPosts.map(child => new RedditPost(child))
  }
}

export default RedditUser
