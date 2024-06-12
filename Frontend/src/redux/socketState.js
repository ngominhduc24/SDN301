import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  conductMeetings: false,
}

export const socketStateSlice = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    setConductMeetings: (state, action) => {
      state.conductMeetings = action.payload
    },
  },
})

export const { setConductMeetings } = socketStateSlice.actions

export default socketStateSlice.reducer
