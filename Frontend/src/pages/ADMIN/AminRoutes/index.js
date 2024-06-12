import { Button, Result } from "antd"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import { MenuItemAdmin } from "src/components/Layouts/MenuItems"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { hasPermission } from "src/lib/utils"
import ROUTER from "src/router"

function AdminRoutes() {
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const { listTabs, userInfo } = useSelector(state => state?.appGlobal)
  const [menuAdmin, setMenuAdmin] = useState([])
  const isLogin = getStorage(STORAGE.TOKEN)
  const location = useLocation()
  const [check, setCheck] = useState()
  const setShowListMenu = list =>
    !!list?.length
      ? list
          ?.filter(x => hasPermission(x?.tabid, [...listTabs]))
          .map(i => ({
            ...i,
            children: setShowListMenu(i?.children),
          }))
      : undefined
  useEffect(() => {
    setCheck(location?.key)
    if (!isLogin)
      setRouterBeforeLogin(`${location.pathname}${location?.search}`)
  }, [isLogin])
  useLayoutEffect(() => {
    if (!!isLogin) {
      const menu = setShowListMenu(MenuItemAdmin())
      setMenuAdmin(menu)
    }
  }, [userInfo, listTabs])
  // if (window.history.state.key !== check) {
  //   setIsModelNotification(false)
  // }
  return !!isLogin ? (
    !!menuAdmin?.length ? (
      <MainLayout isAdmin={true}>
        <Outlet />
      </MainLayout>
    ) : (
      <Result
        status="403"
        title="403 Erorr Permission"
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

export default AdminRoutes

