import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import ROUTER from "src/router"

function PrivateRoutes() {
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const location = useLocation()

  useEffect(() => {
    if (!isLogin)
      setRouterBeforeLogin(`${location.pathname}${location?.search}`)
  }, [isLogin])
  return !!isLogin ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to={ROUTER.DEFAULT} />
  )
}

export default PrivateRoutes
