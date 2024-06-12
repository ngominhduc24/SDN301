import axios from "axios"
import http from "../index"
import {
  apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiRegister,
  apiBussinessRegister,
  apiRegisterAccount,
  apiVerifyCode,
  apiLoginGoole,
  apiCallBackLoginGoole,
  apiConvertAddress,
  apiGetNumberPagePdf,
  apiGetFontSizePdf,
} from "./urls"
import QueryString from "qs"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const bussinessRegister = body => http.post(apiBussinessRegister, body)
const registerAccount = body => http.post(apiRegisterAccount, body)
const forgotPass = body => http.post(apiForgotPassword, body)
const verifyCode = body => http.post(apiVerifyCode, body)
const changePassword = body => http.post(apiChangePassword, body)
const logout = () => http.get(apiLogout)
const convertAddress = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiConvertAddress}?${params}`)
}
//Lấy thông tin mã số thuế
const getInfoByTaxCode = code =>
  axios({
    method: "get",
    url: `https://api.vietqr.io/v2/business/${code}`,
    // data: { user }
  })
//Lấy thông tin mã số thuế
const paymentApi = body => {
  return axios({
    method: "post",
    url: `https://api.vietqr.io/v2/generate`,
    data: body,
    headers: {
      "x-client-id": process.env.REACT_APP_CLIENT_ID,
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  })
}

//pdf
const getNumberPagePdf = body => http.post(apiGetNumberPagePdf, body)
const getFontSizePdf = body => http.post(apiGetFontSizePdf, body)

const AuthService = {
  login,
  logout,
  register,
  paymentApi,
  bussinessRegister,
  registerAccount,
  forgotPass,
  verifyCode,
  changePassword,
  getInfoByTaxCode,
  convertAddress,
  getNumberPagePdf,
  getFontSizePdf,
}
export default AuthService
