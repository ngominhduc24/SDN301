import { Button, Result } from "antd"
import { useContext, useEffect, useState } from "react" // Ensure useState is imported here
import { useSelector } from "react-redux"
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { hasPermission } from "src/lib/utils"
import ROUTER from "src/router"

function ManagerRoutes() {
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const userInfo = useSelector(state => state.appGlobal.userInfo)
  const isLogin = getStorage(STORAGE.TOKEN)
  const role = getStorage(STORAGE.USER_INFO)
  const location = useLocation()
  const [check, setCheck] = useState()

  useEffect(() => {
    console.log("User info from Redux state:", userInfo)
    setCheck(location?.key)
    if (!isLogin) {
      setRouterBeforeLogin(`${location.pathname}${location?.search}`)
    }
  }, [isLogin, userInfo])

  const userRole = userInfo?.role

  return !!isLogin ? (
    role.role === "MANAGER" ? (
      <MainLayout isManager={true}>
        <Outlet />
      </MainLayout>
    ) : (
      <Result
        status="403"
        title="403 Error Permission"
        subTitle="Xin lỗi, Bạn không có quyền truy cập trang web."
        extra={
          <NavLink to={ROUTER.DEFAULT}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" className="btn-hover-shadow">
                Quay lại trang chủ
              </Button>
            </div>
          </NavLink>
        }
      />
    )
  ) : (
    <Navigate to={ROUTER.DANG_NHAP} />
  )
}

export default ManagerRoutes

