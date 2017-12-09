const monthNames = ['January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October',
                    'November', 'December']

export default class DateHelper {
  static month(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  constructor(date) {
    this.date = date
  }

  month() {
    return DateHelper.month(this.date)
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
    return `${monthNames[this.date.getMonth()]} ${this.date.getFullYear()}`
  }
}
