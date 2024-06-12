import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listUser: [],
}

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getListUser: (state, action) => {
      state.listUser = action.payload
    },
  },
})

export const { getListUser } = roleSlice.actions

export default roleSlice.reducer
