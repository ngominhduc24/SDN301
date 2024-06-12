/* eslint-disable radix */
import moment from 'moment'

export function momentDateToString(date = moment(), format = 'YYYY-MM-DD') {
  if (!date) return null
  return moment(moment(date), format).format(format)
}

const parseDT = (dt, format) =>
  parseInt(momentDateToString(dt ? moment(dt) : moment(), format))

const sameYear = (dt1, dt2) => {
  const s1 = parseDT(dt1, 'YYYY')
  const s2 = parseDT(dt2, 'YYYY')
  return s1 === s2
}

const addDateTime = (num = 1, time = 'd', format = 'DD/MM/YYYY') =>
  momentDateToString(moment().add(num, time), format)

const subtractDateTime = (num = 1, time = 'd', format = 'DD/MM/YYYY') =>
  momentDateToString(moment().subtract(num, time), format)

const getWeekDay = (dt = moment()) => {
  const getDay = moment(dt).day()
  return getDay === 0 ? 'Chủ nhật' : `Thứ ${getDay + 1}`
}

export function dateTime(
  endTime = moment(),
  startTime = moment(),
  isPast = false,
  isAbs = false
) {
  let timeLeft = moment(endTime || moment()).diff(moment(startTime || moment()))

  if (timeLeft < 0 && isPast === false) {
    timeLeft = 0
  }

  const seconds = moment.duration(timeLeft).seconds()
  const minutes = moment.duration(timeLeft).minutes()
  const hours = Math.trunc(moment.duration(timeLeft).hours())
  const days = Math.trunc(moment.duration(timeLeft).days())
  const weeks = Math.trunc(moment.duration(timeLeft).weeks())
  const months = Math.trunc(moment.duration(timeLeft).months())
  const years = Math.trunc(moment.duration(timeLeft).years())

  if (isAbs)
    return {
      timeLeft: Math.abs(timeLeft),
      years: Math.abs(years),
      months: Math.abs(months),
      weeks: Math.abs(weeks),
      days: Math.abs(days),
      hours: Math.abs(hours),
      minutes: Math.abs(minutes),
      seconds: Math.abs(seconds)
    }
  return { timeLeft, years, months, weeks, days, hours, minutes, seconds }
}

function getDayMonth(dt1, dt2) {
  const date1 = parseDT(dt1, 'YYYYMMDDHHmmss')
  const date2 = parseDT(dt2, 'YYYYMMDDHHmmss')
  let t1
  let t2
  let days
  if (date1 <= date2) {
    t1 = dt1
    t2 = dt2
  } else {
    t1 = dt2
    t2 = dt1
  }

  const y1 = parseDT(t1, 'YYYY')
  const y2 = parseDT(t2, 'YYYY')
  const m1 = parseDT(t1, 'MM')
  const m2 = parseDT(t2, 'MM')
  const d1 = parseDT(t1, 'DD')
  const d2 = parseDT(t2, 'DD')
  const dIM2 = moment(t2).daysInMonth()

  const months = (y2 - y1) * 12 + m2 - m1 + (d2 >= d1 || dIM2 === d2 ? 0 : -1)

  if (d2 >= d1) {
    days = d2 - d1
  } else {
    const dIM = moment(t1).daysInMonth()
    days = dIM2 === d2 ? dIM - d1 : dIM - d1 + d2
  }

  return { months, days }
}

export function asDateTime(
  endTime = moment(),
  startTime = moment(),
  isPast = false,
  isAbs = false
) {
  let timeLeft = moment(endTime).diff(moment(startTime))

  if (timeLeft < 0 && isPast === false) {
    timeLeft = 0
  }

  const asSeconds = moment.duration(timeLeft).asSeconds()
  const asMinutes = moment.duration(timeLeft).asMinutes()
  const asHours = Math.trunc(moment.duration(timeLeft).asHours())
  const asDays = Math.trunc(moment.duration(timeLeft).asDays())
  const asWeeks = Math.trunc(moment.duration(timeLeft).asWeeks())
  const asMonths = Math.trunc(moment.duration(timeLeft).asMonths())
  const asYears = Math.trunc(moment.duration(timeLeft).asYears())

  if (isAbs)
    return {
      timeLeft: Math.abs(timeLeft),
      asYears: Math.abs(asYears),
      asMonths: Math.abs(asMonths),
      asWeeks: Math.abs(asWeeks),
      asDays: Math.abs(asDays),
      asHours: Math.abs(asHours),
      asMinutes: Math.abs(asMinutes),
      asSeconds: Math.abs(asSeconds)
    }
  return {
    timeLeft,
    asYears,
    asMonths,
    asWeeks,
    asDays,
    asHours,
    asMinutes,
    asSeconds
  }
}

export const fdtfM3Plus = (dt, format = `HH[h]mm’ss’’ DD/MM`) => {
  if (sameYear(dt)) return momentDateToString(dt, format)
  return momentDateToString(dt, `${format}/YYYY`)
}

export const fdtfM1 = (dt, mx = 'm1b') => {
  let fm
  if (mx?.toLowerCase() === 'm1a') fm = `HH[h]`
  if (mx?.toLowerCase() === 'm1b') fm = `HH[h]mm[’]`
  if (mx?.toLowerCase() === 'm1c') fm = `HH[h]mm[’]ss[’’]`
  if (fm === `HH[h]` && moment(dt)?.hour() < 10)
    return momentDateToString(dt, `H[h]`)
  return momentDateToString(dt, `${fm}`)
}

export const fdtfM2 = (dt, mx = 'm2b') => {
  let fm = `HH[h]mm[']`
  if (mx?.toLowerCase() === 'm2a') fm = `YYYY`
  if (mx?.toLowerCase() === 'm2b') fm = `MM/YYYY`
  if (mx?.toLowerCase() === 'm2c') fm = `DD/MM`
  if (mx?.toLowerCase() === 'm2d') fm = `DD/MM/YYYY`
  if (mx?.toLowerCase() === 'm2e') fm = sameYear(dt) ? `DD/MM` : `DD/MM/YYYY`

  return momentDateToString(dt, fm)
}

export const fdtfM3 = (dt, m1, m2) => `${fdtfM1(dt, m1)} ${fdtfM2(dt, m2)}`

export const fdtfM4 = (dt, checkReturn = false) => {
  switch (momentDateToString(dt, 'DD/MM/YYYY')) {
    case subtractDateTime(3):
      return 'Hôm kìa'
    case subtractDateTime(2):
      return 'Hôm kia'
    case subtractDateTime(1):
      return 'Hôm qua'
    case momentDateToString(moment(), 'DD/MM/YYYY'):
      return 'Hôm nay'
    case addDateTime(1):
      return 'Ngày mai'
    case addDateTime(2):
      return 'Ngày kia'
    case addDateTime(3):
      return 'Ngày kìa'
    default:
      return checkReturn ? false : fdtfM3Plus(dt, `DD/MM`)
  }
}

export const fdtfM5 = (dt, checkReturn = false) => {
  const weekInput = momentDateToString(dt, 'WW')
  if (sameYear(dt)) {
    if (weekInput === subtractDateTime(1, 'w', 'WW')) return 'Tuần trước'
    if (weekInput === momentDateToString(moment(), 'WW')) return 'Tuần này'
    if (weekInput === addDateTime(1, 'w', 'WW')) return 'Tuần sau'
    return checkReturn ? false : fdtfM3Plus(dt, `DD/MM`)
  }
  return checkReturn ? false : fdtfM3Plus(dt, `DD/MM`)
}

export const fdtfM6 = (dt, checkReturn = false) => {
  const monthInput = momentDateToString(dt, 'MM/YYYY')
  if (monthInput === subtractDateTime(1, 'M', 'MM/YYYY')) return 'Tháng trước'
  if (monthInput === momentDateToString(moment(), 'MM/YYYY')) return 'Tháng này'
  if (monthInput === addDateTime(1, 'M', 'MM/YYYY')) return 'Tháng sau'
  return checkReturn ? false : fdtfM3Plus(dt, `DD/MM`)
}

export const fdtfM7 = dt =>
  momentDateToString(dt, `[${getWeekDay(dt)}, ngày] DD [tháng] MM [năm] YYYY`)

export const fdtfM8 = dt => {
  const getDay = momentDateToString(dt, `DD/MM`)
  const date = moment(dt).date() < 11 ? 'Ngày mùng' : 'Ngày'
  const day = momentDateToString(dt, `[${date}] D`)
  if (fdtfM4(dt, true)) return `${fdtfM4(dt, true)} (${getDay})`
  if (fdtfM5(dt, true))
    return `${getWeekDay(dt)} ${fdtfM5(dt, true)} (${getDay})`
  if (fdtfM6(dt, true)) return `${day} ${fdtfM6(dt, true)} (${getDay})`
  if (sameYear(dt)) return `${getDay} (${getWeekDay(dt)})`
  return momentDateToString(dt, `DD/MM/YYYY [(${getWeekDay(dt)})]`)
}

export const fdtfM9 = (dt, tf) => {
  const getTime = fdtfM1(dt, tf)
  return `${getTime} ${fdtfM8(dt)}`
}

export const fdtfK1 = (dt1, dt2, k = 'k1b') => {
  const isC1 = k.toLowerCase() === 'k1a'
  const { timeLeft, hours, minutes, seconds } = dateTime(dt1, dt2, true, true)
  const { days, months } = getDayMonth(dt1, dt2)
  const { asHours, asDays } = asDateTime(dt1, dt2, true, true)
  if (timeLeft < 60000) return `${seconds} giây`
  if (timeLeft < 60 * 60000)
    return `${minutes} phút${!isC1 && seconds !== 0 ? ` ${seconds} giây` : ''}`
  if (timeLeft < 24 * 60 * 60000)
    return `${hours} giờ${!isC1 && minutes !== 0 ? ` ${minutes} phút` : ''}`
  if (asHours >= 24 && asDays < 7)
    return `${asDays} ngày${
      !isC1 && asHours % 24 !== 0 ? ` ${asHours % 24} giờ` : ''
    }`

  if (asDays >= 7 && months === 0)
    return `${Math.trunc(days / 7)} tuần${
      !isC1 && days % 7 !== 0 ? ` ${days % 7} ngày` : ''
    }`
  if (months > 0 && months < 12)
    return `${months} tháng${!isC1 && days !== 0 ? ` ${days} ngày` : ''}`
  return `${Math.trunc(months / 12)} năm${
    !isC1 && months % 12 !== 0 ? ` ${months % 12} tháng` : ''
  }`
}

export const fdtfK2 = (dt, k = 'k21') => {
  const strK = ['k21a', 'k21b', 'k22a', 'k22b'].includes(k.toLowerCase())
    ? k.toLowerCase()
    : 'k21b'
  const strC = strK?.charAt(strK.length - 1) === 'a' ? 'k1a' : 'k1b'
  const { timeLeft } = asDateTime(dt, moment(), true)
  if (timeLeft > -6000 && timeLeft < 0) {
    return 'Vừa quá hạn'
  }
  if (timeLeft >= 0 && timeLeft < 6000) {
    return 'Vừa xong'
  }
  const dtK = fdtfK1(dt, moment(), strC)
  if (strK === 'k21a' || strK === 'k21b')
    return `${dtK} ${timeLeft < 0 ? 'trước' : 'sau'}`
  return `${timeLeft < 0 ? 'Quá hạn' : 'Còn lại'} ${dtK}`
}

const fdtf = {
  m1: fdtfM1,
  m2: fdtfM2,
  m3: fdtfM3,
  m4: fdtfM4,
  m5: fdtfM5,
  m6: fdtfM6,
  m7: fdtfM7,
  m8: fdtfM8,
  m9: fdtfM9,
  k1: fdtfK1,
  k2: fdtfK2
}
export default fdtf
