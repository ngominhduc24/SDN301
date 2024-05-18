import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  }
})

export default store