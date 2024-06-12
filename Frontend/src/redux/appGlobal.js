import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listSystemKey: [],
  listSystemCate: [],
  listCount: {},
  listTabs: [],
  isAuthenticated: false,
  userInfo: {},
  isAdmin: false,
  isUser: false,
  isRepresentative: false,
}

export const appGlobalSlice = createSlice({
  name: "appGlobal",
  initialState,
  reducers: {
    getListSystemCate: (state, action) => {
      state.listSystemCate = action.payload || []
    },
    getListSystemKey: (state, action) => {
      state.listSystemKey = action.payload || []
    },
    setListTabs: (state, action) => {
      state.listTabs = action.payload
    },
    changeAuthorization: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setListCount: (state, action) => {
      state.listCount = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload
    },
    setIsRepresentative: (state, action) => {
      state.isRepresentative = action.payload
    },
  },
})

export const {
  getListSystemCate,
  getListSystemKey,
  changeAuthorization,
  setListTabs,
  setListCount,
  setUserInfo,
  setIsAdmin,
  setIsUser,
  setIsRepresentative,
} = appGlobalSlice.actions

export default appGlobalSlice.reducer
