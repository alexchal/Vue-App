export default {
  filters: {
    day: value => {
      const date = new Date(value)
      return date.toString().substring(7, 10)
    },
    month: value => {
      const date = new Date(value)
      return date.toString().substring(4, 7)
    },
    year: value => {
      const date = new Date(value)
      return date.toString().substring(10, 15)
    },
    posted: value => {
      const todayDate = new Date()
      const date = new Date(value)
      let total = Math.floor((Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24))
      if (total === 0) {
        return `Today`
      } else {
        return `${total} days ago`
      }
    }
  }
}
