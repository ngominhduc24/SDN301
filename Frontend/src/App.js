import { Spin } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HubConnectionBuilder } from "@microsoft/signalr"
import STORAGE, { getStorage } from "src/lib/storage"
import "split-pane-react/esm/themes/default.css"
import "./App.scss"
import ModalLoading from "./components/Modal/Loading"
import AppRouter from "./router/AppRouter"
import SpinCustom from "./components/Spin"

function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [connection, setConnection] = useState()
  const { modalLoading } = useSelector(state => state.common)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log("User info from Redux state:", userInfo)
  }, [userInfo])
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

