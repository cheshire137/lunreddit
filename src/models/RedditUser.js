import Fetcher from './Fetcher'
import RedditPost from './RedditPost'

class RedditUser extends Fetcher {
  constructor(username) {
    super('https://www.reddit.com')
    this.username = username
  }

  posts(opts) {
    opts = opts || {}
    const limit = opts.limit || 10
    const path = `/user/${this.username}/submitted.json?limit=${limit}`
    return this.get(path).then(resp => resp.data.children.map(child => new RedditPost(child.data)))
  }
}

export default RedditUser
