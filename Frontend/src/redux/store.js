import { configureStore } from "@reduxjs/toolkit"
import appGlobalReducer from "./appGlobal"
import commonReducer from "./common"
import roleReducer from "./role"
import loginModalReducer from "./loginModal"
import regionReducer from "./region"
import votingReducer from "./voting"
import socketStateReducer from "./socketState"
import notifyReducer from "./notify"

export default configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    role: roleReducer,
    common: commonReducer,
    loginModal: loginModalReducer,
    region: regionReducer,
    voting: votingReducer,
    socketState: socketStateReducer,
    notify: notifyReducer,
  },
})
