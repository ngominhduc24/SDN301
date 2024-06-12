import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifyData: [],
}

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotify: (state, action) => {
      state.notifyData = action.payload
    },
  },
})

export const { setNotify } = notifySlice.actions

export default notifySlice.reducer
