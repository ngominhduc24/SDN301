//Lấy ra màu tương phản của màu chữ so màu nền
//Input: màu nền
//Output: màu chữ tương phản với màu nền
export const getContrastYIQ = hexcolor => {
  if (hexcolor === "#fff") hexcolor = "#ffffff"
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "black" : "white"
}
