import { Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HubConnectionBuilder } from "@microsoft/signalr"
import STORAGE, { getStorage } from "src/lib/storage"
// import CommonService from "src/services/CommonService"
import "split-pane-react/esm/themes/default.css"
import "./App.scss"
import ModalLoading from "./components/Modal/Loading"
import { ACCOUNT_TYPE_ID } from "./constants/constants"
import {
  getListSystemCate,
  getListSystemKey,
  setListTabs,
  setUserInfo,
} from "./redux/appGlobal"
import AppRouter from "./router/AppRouter"
// import SystemCateService from "./services/SystemCateService"
import { setConductMeetings } from "./redux/socketState"
import { setVotingModal } from "./redux/voting"
import { setNotify } from "./redux/notify"
// import NotifyService from "./services/NotifyService"
import SpinCustom from "./components/Spin"

function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [connection, setConnection] = useState()
  const { modalLoading } = useSelector(state => state.common)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!isLogin) {
      const RESTFUL_BASE_URL = process.env.REACT_APP_API_WS || ""
      const connect = new HubConnectionBuilder()
        .withUrl(
          `${RESTFUL_BASE_URL}/signalrServer?Authorization=` +
            encodeURIComponent(isLogin),
          {
            headers: {
              Authorization: isLogin,
              // MaintenanceModeCode: getStorage(STORAGE.MAINTENANCE_CODE),
            },
          },
        )
        .withAutomaticReconnect()
        .build()
      console.log("connection", connect)
      setConnection(connect)
    }
  }, [isLogin])
  useEffect(() => {
    if (!!connection) {
      connection.start().catch(error => console.log(error))
      // NotifyMessage
      connection.on("NotifyMessage", message => {
        console.log("messageNo", message)
        if (!!message.Data) {
          dispatch(setNotify(message?.Data))
        }
      })
      // Điều hành cuộc hop[j]
      connection.on("ConductMeetings", message => {
        console.log("ConductMeetings", message)
        if (!!message.Data) {
          dispatch(setConductMeetings(message?.Data))
        }
      })
      // Biểu quyết
      connection.on("Voting", message => {
        console.log("Voting", message)
        if (!!message.Data) {
          dispatch(setVotingModal(message?.Data))
          // setOpenModalVoting(message?.Data)
        }
      })
    }
  }, [connection])
  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <SpinCustom />
          </div>
        ) : (
          <AppRouter />
        )}
      </div>
      {!!modalLoading && <ModalLoading />}
    </div>
  )
}

export default App

