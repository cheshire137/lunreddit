const monthNames = ['January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October',
                    'November', 'December']

export default class DateHelper {
  static month(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  static monthNames() {
    return monthNames
  }

  constructor(date) {
    this.date = date
  }

  timeSince() {
    const current = new Date()
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - this.date;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds'
    }

    if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes'
    }

    if (elapsed < msPerDay ) {
      return Math.round(elapsed / msPerHour ) + ' hours'
    }

    if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days'
    }

    if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months'
    }

    return Math.round(elapsed / msPerYear ) + ' years'
  }

  month() {
    return DateHelper.month(this.date)
  }

  monthName() {
    return monthNames[this.date.getMonth()]
  }

  isSameMonth(date2) {
    if (!this.date && date2 || this.date && !date2) {
      return false
    }
    if (!this.date && !date2) {
      return true
    }
    const month1 = this.month()
    const month2 = DateHelper.month(date2)
    return month1.getTime() === month2.getTime()
  }

  monthLabel() {
    return `${this.monthName()} ${this.date.getFullYear()}`
  }
}
