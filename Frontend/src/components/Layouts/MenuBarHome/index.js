import { useNavigate } from "react-router-dom"
import { StyleMenuBar } from "./styled"
import ROUTER from "src/router"
import LayoutCommon from "src/components/Common/Layout"

const MenuBarHome = () => {
  const navigate = useNavigate()
  const pathname = window.location.pathname
  const listItem = [
    {
      path: ROUTER.HOME,
      name: "Trang chủ",
      pathname: "/",
    },
    {
      path: ROUTER.HO_SO_CA_NHAN,
      name: "Quản lý hồ sơ",
      pathname: "/ho-so-ca-nhan",
    },
    {
      path: ROUTER.TAO_HO_SO,
      name: "Tạo hồ sơ",
      pathname: "/tao-ho-so",
    },
    {
      path: ROUTER.HO_TRO,
      name: "Hỗ trợ",
      pathname: "/ho-tro",
    },
    {
      path: ROUTER.THANH_TOAN,
      name: "Thanh toán",
      pathname: "/thanh-toan",
    },
    {
      path: ROUTER.HO_SO_CHO_XU_LY,
      name: "Danh sách hồ sơ",
      pathname: "/danh-sach-ho-so",
    },
  ]
  return (
    <StyleMenuBar>
      <LayoutCommon>
        <div className="d-flex-start">
          {listItem?.map(data => (
            <div
              className="fw-400 fs-18 pt-10 pb-10 pl-20 pr-20 white ml-10 mr-10 menu-item-hover "
              style={
                pathname === data?.pathname
                  ? { backgroundColor: "#5F96DE" }
                  : {}
              }
              onClick={() => {
                navigate(data?.path)
              }}
            >
              {data?.name}
            </div>
          ))}
        </div>
      </LayoutCommon>
    </StyleMenuBar>
  )
}
export default MenuBarHome
