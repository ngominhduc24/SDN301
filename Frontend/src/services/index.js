import axios from "axios"
import notice from "src/components/Notice"
import STORAGE, { deleteStorage, getStorage } from "src/lib/storage"
import { getMsgClient } from "src/lib/stringsUtils"
import { trimData } from "src/lib/utils"
import ROUTER from "src/router"
/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages })
    }
    return Promise.reject({ messages: [messages] })
  }
  return Promise.reject({ messages: ["Server quá tải"] })
}

/**
 * parse response
 */

export function parseBody(response) {
  const resData = response.data
  if (+response?.status >= 500) {
    return notice({
      msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ`,
      isSuccess: false,
    })
  }
  if (+response?.status < 500 && +response?.status !== 200) {
    return notice({
      msg: `Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ (SC${response?.status})`,
      isSuccess: false,
    })
  }

  if (response?.status === 200) {
    if (resData.StatusCode === 401) {
      deleteStorage(STORAGE.TOKEN)
      return window.location.replace(ROUTER.HOME)
    }
    if (resData.Status === -2) return resData // ma sp, ten sp ton tai
    if (resData.Status === 0) return resData // API tra ve success

    if (resData.Status !== -1 && resData.Status !== 69 && resData.Object) {
      notice({
        msg: getMsgClient(resData.Object?.replace("[MessageForUser]", "")),
        isSuccess: false,
      })
    }
    if (resData.Status !== 1 && resData.Object) {
      return {
        ...resData,
        object: getMsgClient(resData.Object),
      }
    }
    return resData
  }
  return parseError(resData?.messages)
}

/**
 * axios instance
 */
// const baseURL = ''
const instance = axios.create({
  // baseURL: '',
  timeout: 60000,
})

// request header
instance.interceptors.request.use(
  config => {
    config.baseURL = process.env.REACT_APP_ROOT_API
    return config
  },
  error => Promise.reject(error.message),
)

// response parse
instance.interceptors.response.use(
  response => parseBody(response),
  error => {
    // can not connect API
    if (error.code === "ECONNABORTED") {
      notice({
        msg: "Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ ",
        isSuccess: false,
      })
    } else if (+error?.response?.status >= 500) {
      notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      })
    } else if (
      +error?.response?.status < 500 &&
      +error?.response?.status !== 200
    ) {
      notice({
        msg: `Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ (SC${error?.response?.status})`,
        isSuccess: false,
      })
    } else if (error.code === "ERR_NETWORK") {
      notice({
        msg: `Hệ thống đang bị gián đoạn, vui lòng kiểm tra lại đường truyền!`,
        isSuccess: false,
      })
    } else if (typeof error.response === "undefined") {
      notice({ msg: error.response, isSuccess: false })
    } else if (error.response) {
      notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      })
      return parseError(error.response.data)
    } else
      notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      })
    return Promise.reject(error)
  },
)

export default instance

export const httpGetFile = (path = "", optionalHeader = {}) =>
  instance({
    method: "GET",
    url: path,
    headers: { ...optionalHeader },
  })

