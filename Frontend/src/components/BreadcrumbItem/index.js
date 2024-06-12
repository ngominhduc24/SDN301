import { Breadcrumb } from "antd"
import { useNavigate } from "react-router-dom"
const BreadcrumbItem = ({ path, children, ...props }) => {
  const navigate = useNavigate()
  return (
    <Breadcrumb.Item
      onClick={() => {
        if (!path) return
        window.scrollTo({ top: 0, left: 0 })
        navigate(path?.replace("submenu", ""))
      }}
      style={{ cursor: !!path && "pointer" }}
      {...props}
    >
      {children}
    </Breadcrumb.Item>
  )
}
export default BreadcrumbItem
