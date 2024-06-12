import moment from "moment"

export const fomatTimeFromNow = time => {
  //   const time = moment()
  //   return moment(time).fromNow()
  if (!(moment(time).diff(moment(), "days") < 0)) return moment(time).fromNow()
  else return moment(time).format("DD/MM/YYYY")
}

export const compareTime = (start, end) => {
  // Lấy thời điểm hiện tại
  const now = new Date()

  // Khoảng thời gian bắt đầu và kết thúc (điều chỉnh theo nhu cầu của bạn)
  const startTime = new Date(start)
  const endTime = new Date(end)

  // Kiểm tra xem thời điểm hiện tại có nằm giữa khoảng thời gian không
  if (now >= startTime && now <= endTime) {
    return 1
  }
  if (now < startTime) return 2
  if (now > endTime) return 3
  return false
}
