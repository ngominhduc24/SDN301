const STORAGE = {
  TOKEN: "token",
  USER_INFO: "user-info",
  USER_ID: "id",
  REMEMBER_LOGIN: "remember-login",
  KEY_MENU_ACTIVE: "key-active",
  TABS_PAGE_ACTIVE: "tabs-page-active",
  ERROR_EXTENSION: "error-extension",
}

export const getStorage = name => {
  // const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  let data
  data =
    typeof window !== "undefined" && name !== undefined
      ? localStorage.getItem(name)
      : ""
  // if (remember) {
  //   data =
  //     typeof window !== "undefined" && name !== undefined
  //       ? localStorage.getItem(name)
  //       : ""
  // } else {
  //   data =
  //     typeof window !== "undefined" && name !== undefined
  //       ? sessionStorage.getItem(name)
  //       : ""
  // }
  try {
    if (data) return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setStorage = (name, value) => {
  // const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value
  return localStorage.setItem(name, stringify)
  // if (remember) {
  //   return localStorage.setItem(name, stringify)
  // } else {
  //   return sessionStorage.setItem(name, stringify)
  // }
}

export const deleteStorage = name => {
  return localStorage.removeItem(name)
  // const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  // if (remember) {
  //   return localStorage.removeItem(name)
  // } else {
  //   return sessionStorage.removeItem(name)
  // }
}

export const clearStorage = () => {
  return localStorage.clear()
  // const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  // if (remember) {
  //   return localStorage.clear()
  // } else {
  //   return sessionStorage.clear()
  // }
}

export default STORAGE

