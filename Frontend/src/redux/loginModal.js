import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  openLoginModal: false,
  openChangePassModal: false,
  IsFirstLogin: false,
}

export const loginModal = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    setOpenLoginModal: (state, action) => {
      state.openLoginModal = action.payload
    },
    setOpenChangePassModal: (state, action) => {
      state.openChangePassModal = action.payload
    },
    setIsFirstLogin: (state, action) => {
      state.IsFirstLogin = action.payload
    },
  },
})

export const { setOpenLoginModal, setIsFirstLogin, setOpenChangePassModal } =
  loginModal.actions

export default loginModal.reducer
