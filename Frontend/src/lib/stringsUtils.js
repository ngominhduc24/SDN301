/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
import { Encoder } from "./encoder"

export const SYMBOLS_REGEX =
  /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|-|{|}|\||\\/g //eslint-disable-line

export function regexIDCard() {
  const re = /^([0-9]{9}(?:[0-9]{3})?|[A-Za-z0-9]{5,9})$/
  return re
}

export function generateRandomString() {
  return Math.random().toString(36).substr(7)
}
export const getRegexPassword = () => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  return regex
}
export function getRegexUsername() {
  const re = /^[a-zA-Z0-9_]{6,16}$/
  return re
}

export function generateCode(str, underscore = true) {
  if (!str) return ""
  str = str?.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " ",
  )
  str = str.replace(/ + /g, " ")
  str = str.trim()
  str = str.toUpperCase()
  const matches = str.match(/\b(\w)/g)
  if (!matches) return ""
  const acronym = matches.join("")
  if (underscore) return `${acronym}_`
  return acronym
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function validatePhone(phone) {
  if (
    ((phone.startsWith("01") ||
      phone.startsWith("028") ||
      phone.startsWith("023") ||
      phone.startsWith("02")) &&
      phone.length === 11) ||
    ((phone.startsWith("03") ||
      phone.startsWith("05") ||
      phone.startsWith("07") ||
      phone.startsWith("08") ||
      phone.startsWith("09")) &&
      phone.length === 10)
  )
    return true
  return false
}

export function formatPhone(phone) {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
}

export function getMsgClient(message) {
  return message.indexOf("[!|") !== -1 && message.indexOf("|!]") !== -1
    ? message.split("[!|")[0].trim() + message.split("|!]")[1]
    : message
}

export function validateEmail(email) {
  const re = getRegexEmail()
  return re?.test(String(email)?.toLowerCase())
}

export function getRegexEmail() {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export function validateMobile(mobile) {
  const re = getRegexMobile()
  return re?.test(String(mobile)?.toLowerCase())
}

export function getRegexBrandName() {
  const re = /^(?!.*[-_\\.\\s]{2})([a-zA-Z0-9-_\\.\\s]{0,10}[a-zA-Z0-9])?$/
  return re
}

export function getRegexPhoneNumber() {
  const re = /^(\+84|84|0)+(9|3|7|8|5)+([0-9]{8})\b/g
  return re
}

export function getRegexMobile() {
  // const re = /^([0-9]{8,15})\b/g
  const re = /^[0-9.+-\s]*$/
  return re
}

export const decodeHtml = textInput => {
  if (!textInput) return ""
  const removeHtml = textInput.replace(/<\/?[^>]+(>|$)/g, "")
  const decode = Encoder.htmlDecode(removeHtml)
  return decode
}

export const stripHtml = textInput => {
  if (!textInput) return ""
  return textInput.replace(/<\/?[^>]+(>|$)/g, "")
}

export const convertContent = text => {
  let content
  try {
    const parseText = JSON.parse(decodeHtml(text))
    content = [parseText?.ActionName, parseText?.ProcessedContent]
      .join(parseText?.ActionName && parseText?.ProcessedContent ? ": " : "")
      .concat(
        parseText?.SendReportHandle ? ` ${parseText?.SendReportHandle}` : "",
      )
  } catch (e) {
    content = text
  }
  return content
}

export const fixImplicateText = text => {
  if (!text) return ""
  return text
    ?.replace(/↵/g, " ")
    ?.replace(/(<div>|<p>)/g, "&nbsp;<span>")
    ?.replace(/(<\/div>|<\/p>)/g, "</span>")
    ?.replace(/(<div |<p )/g, "&nbsp;<span ")
    ?.replace(/(<br>|<br\/>|<\/br>|<br \/>)/g, " ")
}

export function getTimeSpent() {
  const re = /^(d[g|h]?)?(d{1}?[05][m|p])?$/
  return re
}

export function formatUserName(fullName, userName, deptName) {
  if (!userName) return `${fullName} - ${deptName}`
  if (!deptName) return ` ${userName} - ${fullName} `
  return `${fullName} - (${userName}) - ${deptName}`
}

export function getRegexNumber() {
  const re = /^[0-9]+$/
  return re
}
export function getRegexNumberAcreage() {
  const re = /^\d+(\.\d+)?$/
  return re
}
export function getRegexNumberPattern() {
  const re = /^\d{5}$/
  return re
}

export function removeVietnameseAccents(str) {
  // Dùng bảng mã Unicode để thay thế các ký tự có dấu bằng các ký tự không dấu
  str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
  str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i")
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
  str = str.replace(/đ/g, "d")
  str = str.replace(/Đ/g, "D")

  return str
}
