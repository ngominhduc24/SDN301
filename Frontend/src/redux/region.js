import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listProvince: [],
}

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setListProvince: (state, action) => {
      state.listProvince = action.payload
    },
  },
})

export const { setListProvince } = regionSlice.actions

export default regionSlice.reducer
