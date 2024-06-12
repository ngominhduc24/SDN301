import moment from "moment"
import dayjs from "dayjs"

export const DATE_FORMAT = "YYYY-MM-DD"
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm"
export const DATE_FORMAT_DD = "DD-MM-YYYY"
export const DATE_TIME_FORMAT_DD = "DD/MM/YYYY HH:mm"

export const TIME_FORMAT_SLASH = "HH:mm"
export const DATE_FORMAT_SLASH = "DD/MM/YYYY"
export const DATE_FORMAT_SLASH_Y = "YYYY/MM/DD"
export const REGEX_DATE_FORMAT =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g

export const FULL_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ"

export function momentDateToString(date, format = DATE_FORMAT) {
  if (!date) return null
  return moment(date, format).format(format)
}

export function formatDate(date, format = DATE_FORMAT_SLASH) {
  if (!date) return null
  return moment(date).format(format)
}

export function formatTime(date, format = TIME_FORMAT_SLASH) {
  if (!date) return null
  return moment(date).format(format)
}

export function formatDateAndTime(date, format = DATE_FORMAT) {
  if (!date) return null
  return moment(date).format(DATE_TIME_FORMAT_DD)
}

export function extractTime(endTime, startTime = null) {
  const start = startTime ? moment(startTime) : moment()
  const end = moment(endTime)

  let timeLeft = end.diff(start)

  if (timeLeft < 0) {
    timeLeft = 0
  }

  const seconds = moment.duration(timeLeft).seconds()
  const minutes = moment.duration(timeLeft).minutes()
  const hours = Math.trunc(moment.duration(timeLeft).asHours())
  const days = Math.trunc(moment.duration(timeLeft).asDays())
  const weeks = Math.trunc(moment.duration(timeLeft).asWeeks())
  const months = Math.trunc(moment.duration(timeLeft).asMonths())
  const years = Math.trunc(moment.duration(timeLeft).asYears())

  return { timeLeft, years, months, weeks, days, hours, minutes, seconds }
}

export const DisableBeforeDate = (
  current,
  endDate = dayjs().startOf("day"),
) => {
  return current && current >= endDate
}

export const DisableAfterDate = (
  current,
  endDate = dayjs().startOf("day"),
) => {
  return current && current <= endDate
}

export const DisableBetweenDate = (
  current,
  startDate = dayjs().startOf("day"),
  endDate = dayjs().endOf("day"),
) => {
  return current && (current <= startDate.startOf('day') || current > endDate.endOf('day'))
}

export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export const disabledBeforeHours = (current, startDate) => {
  if (current?.$D === startDate?.$D) {
    return range(0, 24).splice(0, startDate?.$H)
  }
}

export const disabledBeforeMinutes = (current, startDate) => {
  if (current?.$D === startDate?.$D) {
    return range(0, 60).splice(0, startDate?.$m)
  }
}

export function getDayNumberByDate(dt = "now") {
  if (!dt) return null
  const arr = [2, 3, 4, 5, 6, 7, 8]
  if (dt === "now") return arr[moment().format("d")]
  return arr[moment(dt).format("d")]
}

const parseWeek = (dt, diffDay) => {
  const dateNumber = getDayNumberByDate(dt)
  const x = diffDay % 7
  const y = Math.floor(diffDay / 7)
  const compareDate = x - (9 - dateNumber)
  if (compareDate > 0) return y + 1
  return y
}

const diffDateTime = dt => {
  const currentSecond = parseInt(momentDateToString(moment(), "YYYYMMDDHHmmss"))
  const inputSecond = parseInt(momentDateToString(dt, "YYYYMMDDHHmmss"))
  const currentMinute = parseInt(momentDateToString(moment(), "YYYYMMDDHHmm"))
  const inputMinute = parseInt(momentDateToString(dt, "YYYYMMDDHHmm"))
  const currentHour = parseInt(momentDateToString(moment(), "YYYYMMDDHH"))
  const inputHour = parseInt(momentDateToString(dt, "YYYYMMDDHH"))
  const currentDay = parseInt(momentDateToString(moment(), "YYYYMMDD"))
  const inputDay = parseInt(momentDateToString(dt, "YYYYMMDD"))
  const currentMonth = parseInt(momentDateToString(moment(), "YYYYMM"))
  const inputMonth = parseInt(momentDateToString(moment(dt), "YYYYMM"))
  const currentYear = parseInt(momentDateToString(moment(), "YYYY"))
  const inputYear = parseInt(momentDateToString(moment(dt), "YYYY"))
  const diffSecond = currentSecond - inputSecond
  const diffMinute = currentMinute - inputMinute
  const diffHour = currentHour - inputHour
  const diffDay = currentDay - inputDay
  const diffWeek = parseWeek(dt, diffDay)
  const diffMonth = currentMonth - inputMonth
  const diffYear = currentYear - inputYear

  return {
    diffSecond,
    diffMinute,
    diffHour,
    diffDay,
    diffWeek,
    diffMonth,
    diffYear,
  }
}

/** dtf = datetime format */
export function getDayNameByDate(dt = "now") {
  if (!dt) return null
  const arr = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
  if (dt === "now") return arr[moment().format("d")]
  return arr[moment(dt).format("d")]
}

export function dtf1(dt, format = "HH[h]mm") {
  if (!dt) return null
  return moment(dt).format(format)
}

export function dtf2(dt, displayTime = false) {
  if (!dt) return null

  const date = moment(dt).format("DD/MM/YYYY")
  const time = displayTime ? `[${moment(dt).format("HH[h]mm[']")}] ` : ""
  const homnay = moment().format("DD/MM/YYYY")
  const ngaymai = moment().add(1, "d").format("DD/MM/YYYY")
  const ngaykia = moment().add(2, "d").format("DD/MM/YYYY")
  const homqua = moment().subtract(1, "d").format("DD/MM/YYYY")
  const homkia = moment().subtract(2, "d").format("DD/MM/YYYY")
  const tuannay = moment().format("WW")
  const namnay = moment().format("YYYY")

  if (date === homnay) return moment(dt).format(`${time}[Hôm nay (]DD/MM[)]`)
  if (date === ngaymai) return moment(dt).format(`${time}[Ngày mai (]DD/MM[)]`)
  if (date === ngaykia) return moment(dt).format(`${time}[Ngày kia (]DD/MM[)]`)
  if (date === homqua) return moment(dt).format(`${time}[Hôm qua (]DD/MM[)]`)
  if (date === homkia) return moment(dt).format(`${time}[Hôm kia (]DD/MM[)]`)
  if (moment(dt).format("YYYY") === namnay) {
    if (
      moment(dt).format("WW") === tuannay &&
      [homnay, ngaymai, ngaykia].indexOf(date) === -1
    )
      return moment(dt).format(
        `${time}[${getDayNameByDate(dt)}] [Tuần này (]DD/MM[)]`,
      )

    if (+moment(dt).format("WW") === parseInt(tuannay) + 1)
      return moment(dt).format(
        `${time}[${getDayNameByDate(dt)}] [ Tuần sau (]DD/MM[)]`,
      )

    if (
      +moment(dt).format("WW") === parseInt(tuannay) + 2 ||
      [homqua, homkia].indexOf(date) === -1
    )
      return moment(dt).format(`${time}[${getDayNameByDate(dt)}] [ (]DD/MM[)]`)
  }

  return moment(dt).format(`${time}[${getDayNameByDate(dt)}] [ (]DD/MM/YYYY[)]`)
}

export function dtf3(dt) {
  return dtf2(dt, true)
}

export function dtf4(dt) {
  if (!dt) return null

  const a = moment([
    moment().get("year"),
    moment().get("month"),
    moment().get("date"),
  ])

  const b = moment([
    moment(dt).get("year"),
    moment(dt).get("month"),
    moment(dt).get("date"),
  ])

  const c = a.diff(b, "days")

  // cung ngay thi tinh phut
  if (+c === 0) {
    const x = moment([
      moment().get("year"),
      moment().get("month"),
      moment().get("date"),
      moment().get("hour"),
      moment().get("minute"),
    ])

    const y = moment([
      moment(dt).get("year"),
      moment(dt).get("month"),
      moment(dt).get("date"),
      moment(dt).get("hour"),
      moment(dt).get("minute"),
    ])

    return `${Math.abs(x.diff(y, "minutes"))} phút`
  }
  return `${Math.abs(c)} ngày`
}

export function dtf5Prefix(num) {
  return num < 0 ? "Còn lại " : "Quá hạn "
}

export function dtf5(dt) {
  if (!dt) return null
  // dt = '2020-11-20T04:31:46.683'
  const curDt = moment([
    moment().get("year"),
    moment().get("month"),
    moment().get("date"),
    moment().get("hour"),
    moment().get("minute"),
  ])

  const inputDt = moment([
    moment(dt).get("year"),
    moment(dt).get("month"),
    moment(dt).get("date"),
    moment(dt).get("hour"),
    moment(dt).get("minute"),
  ])

  const diffMonth = curDt.diff(inputDt, "months")
  const diffWeek = curDt.diff(inputDt, "weeks")
  const diffDay = curDt.diff(inputDt, "days")
  const diffHour = curDt.diff(inputDt, "hours")
  const diffMin = curDt.diff(inputDt, "minutes")

  if (Math.abs(diffMin) >= 0 && Math.abs(diffMin) < 60)
    return `${dtf5Prefix(diffMin) + Math.abs(diffMin)} phút`

  if (Math.abs(diffHour) >= 1 && Math.abs(diffHour) < 24)
    return `${dtf5Prefix(diffHour) + Math.abs(diffHour)} giờ ${Math.abs(
      diffMin - diffHour * 60,
    )} phút`

  if (Math.abs(diffDay) >= 1 && Math.abs(diffDay) < 7) {
    // lam tron neu so phut > 30
    const gio =
      Math.abs(
        diffMin - diffDay * 24 * 60 - Math.abs(diffHour - diffDay * 24) * 60,
      ) >= 30
        ? Math.abs(diffHour - diffDay * 24) + 1
        : Math.abs(diffHour - diffDay * 24)

    if (+gio === 0) return `${dtf5Prefix(diffDay) + Math.abs(diffDay)} ngày`
    if (+gio === 24)
      return `${dtf5Prefix(diffDay) + (Math.abs(diffDay) + 1)} ngày`
    return `${dtf5Prefix(diffDay) + Math.abs(diffDay)} ngày ${gio} giờ `
  }

  if (Math.abs(diffDay) >= 7 && Math.abs(diffMonth) === 0) {
    const ngay = Math.abs(diffDay - diffWeek * 7)
    return `${dtf5Prefix(diffDay) + Math.abs(diffWeek)} tuần ${ngay > 0 ? `${ngay} ngày ` : ""
      }`
  }

  const dateDL = moment(dt).get("date")
  const dateTD = moment().get("date")
  // qua han
  if (diffMonth > 0) {
    if (dateDL > dateTD) {
      const daysInMonthDL = moment(dt).daysInMonth()
      const songay = daysInMonthDL - dateDL + dateTD
      if (songay < 30)
        return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)
          } tháng ${songay} ngày`
      return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)} tháng`
    }
    if (dateDL === dateTD) {
      return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)} tháng`
    }
    if (dateDL < dateTD) {
      const songay = dateTD - dateDL
      return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)
        } tháng ${songay} ngày`
    }
  }
  // con han
  if (dateDL > dateTD) {
    const songay = dateDL - dateTD
    return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)} tháng ${songay} ngày`
  }
  if (dateDL === dateTD) {
    return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)} tháng`
  }
  const daysInMonthTD = moment().daysInMonth()
  const songay = daysInMonthTD - dateTD + dateDL
  if (songay < 30)
    return `${dtf5Prefix(diffMonth) + Math.abs(diffMonth)} tháng ${songay} ngày`
  return `${dtf5Prefix(diffMonth) + (Math.abs(diffMonth) + 1)} tháng`
}

export function dtf6Suffix(num) {
  return num > 0 ? " trước" : " sau"
}

export function dtf6(dt) {
  if (!dt) return null

  const time = `[${moment(dt).format("HH[h]mm[']")}] `

  const curDt = moment([
    moment().get("year"),
    moment().get("month"),
    moment().get("date"),
    moment().get("hour"),
    moment().get("minute"),
    moment().get("second"),
  ])

  const inputDt = moment([
    moment(dt).get("year"),
    moment(dt).get("month"),
    moment(dt).get("date"),
    moment(dt).get("hour"),
    moment(dt).get("minute"),
    moment(dt).get("second"),
  ])

  const diffDay = curDt.diff(inputDt, "days")
  const diffHour = curDt.diff(inputDt, "hours")
  const diffMin = curDt.diff(inputDt, "minutes")
  const diffSec = curDt.diff(inputDt, "seconds")

  if (Math.abs(diffSec) >= 0 && Math.abs(diffSec) < 60)
    return `${Math.abs(diffSec)} giây${dtf6Suffix(diffSec)}`

  if (Math.abs(diffSec) >= 60 && Math.abs(diffSec) < 60 * 60)
    return `${Math.abs(diffMin)} phút${dtf6Suffix(diffSec)}`

  if (Math.abs(diffHour) >= 1 && Math.abs(diffHour) < 24)
    return `${Math.abs(diffHour)} giờ${dtf6Suffix(diffHour)}`

  if (Math.abs(diffDay) >= 1 && Math.abs(diffDay) < 30)
    return `${Math.abs(diffDay)} ngày${dtf6Suffix(diffDay)}`

  return moment(dt).format(`${time}[${getDayNameByDate(dt)}] [ (]DD/MM[)]`)
}

export function dtf7(dt) {
  if (!dt) return null

  const timeDetail = extractTime(moment(), dt)
  const datetimeFormat = moment(dt).format(`[(lúc] H[h]mm['] [ngày] DD/MM[)]`)

  const { diffDay, diffWeek, diffMonth, diffYear } = diffDateTime(dt)

  const formattedTime =
    timeDetail.seconds < 10 ? `0${timeDetail.seconds}` : timeDetail.seconds

  if (timeDetail.timeLeft < 5 * 1000) return `vừa xong`
  if (timeDetail.timeLeft < 60 * 1000) return `${formattedTime} giây trước`
  if (timeDetail.hours === 0)
    return `${timeDetail.minutes} phút trước ${moment(dt).format(
      `[(lúc ]H[h]mm['] [hôm nay)]`,
    )}`

  if (diffDay === 0)
    return `${timeDetail.hours} giờ trước ${moment(dt).format(
      `[(lúc ]H[h]mm['] [hôm nay)]`,
    )}`
  if (diffDay === 1) return `Ngày hôm qua ${datetimeFormat}`
  if (diffDay === 2) return `Ngày hôm kia ${datetimeFormat}`

  if (diffWeek === 0) return `${timeDetail.days} ngày trước ${datetimeFormat}`
  if (diffWeek === 1) return `Tuần trước ${datetimeFormat}`

  if (diffMonth === 0) return `${diffWeek} tuần trước ${datetimeFormat}`
  if (diffMonth === 1) return `Tháng trước ${datetimeFormat}`

  if (diffYear === 0) return `${diffMonth} tháng trước ${datetimeFormat}`

  if (diffYear === 1) return `Năm ngoái ${datetimeFormat}`

  return `${diffYear} năm trước ${datetimeFormat}`
}

export function dtf8(dt) {
  if (!dt) return null

  const time = `[${moment(dt).format("HH[h]mm[']")}] `
  const namnay = moment().format("YYYY")

  if (moment(dt).format("YYYY") === namnay) {
    return moment(dt).format(`${time}DD/MM`)
  }

  return moment(dt).format(`${time}DD/MM/YYYY`)
}

export function durationDate(startDate, endDate) {
  const thisYear = moment().format("YYYY")
  if (!startDate || !endDate) return null
  if (
    moment(startDate).format("YYYY") === thisYear &&
    moment(endDate).format("YYYY") === thisYear
  ) {
    return `${formatDate(startDate, "DD/MM")} - ${formatDate(endDate, "DD/MM")}`
  }
  return `${formatDate(startDate, DATE_FORMAT_SLASH)} - ${formatDate(
    endDate,
    DATE_FORMAT_SLASH,
  )}`
}
