import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
    genres: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setGenres: (state, action) => {
      state.genres = action.payload
    }
  }
})


export default globalSlice

