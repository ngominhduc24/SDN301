import { Outlet } from "react-router-dom"
import MainLayout from "src/components/Layouts"

function PublicRoutes() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default PublicRoutes
