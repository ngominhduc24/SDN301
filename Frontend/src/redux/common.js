import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  importLoading: false,
  modalLoading: false,
}

export const commonSlice = createSlice({
  name: "appreciation",
  initialState,
  reducers: {
    changeImportLoading: (state, action) => {
      state.importLoading = action.payload
    },
    changeModalLoading: (state, action) => {
      state.modalLoading = action.payload
    },
  },
})

export const { changeImportLoading, changeModalLoading } = commonSlice.actions

export default commonSlice.reducer
