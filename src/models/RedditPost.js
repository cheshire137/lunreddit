export default class RedditPost {
  static getThumbnailUrl(data) {
    if (data.url && data.url.indexOf('gfycat.com') > -1) {
      const url = new URL(data.url)
      const pathParts = url.pathname.split('/')
      const gfycatName = pathParts[pathParts.length - 1]
      return `https://thumbs.gfycat.com/${gfycatName}-size_restricted.gif`
    }

    if (data.preview && data.preview.images) {
      const images = data.preview.images[0].resolutions
      const image = images.filter(img => img.width > 200)[0]
      if (image) {
        return image.url.replace(/&amp;/g, '&')
      }
    }

    return null
  }

  constructor(child) {
    const data = child.data
    console.log(data)
    this.url = `https://www.reddit.com${data.permalink}`
    this.title = data.title
    this.key = data.id
    this.comments = data.num_comments
    this.commentsUnit = this.comments === 1 ? 'comment' : 'comments'
    this.subreddit = `/${data.subreddit_name_prefixed}`
    this.subredditUrl = `https://www.reddit.com/${data.subreddit_name_prefixed}`
    this.date = new Date(data.created * 1000)
    this.points = data.score
    this.domain = data.domain
    if (this.domain && this.domain.indexOf('self.') < 0) {
      this.domainUrl = `https://www.reddit.com/domain/${this.domain}/`
    }
    this.pointsUnit = this.points === 1 ? 'point' : 'points'
    this.fullname = `${child.kind}_${data.id}`
    this.linkUrl = data.url
    this.thumbnailUrl = RedditPost.getThumbnailUrl(data)
  }
}
