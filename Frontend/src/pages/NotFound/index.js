import { Button, Result } from "antd"
import { NavLink } from "react-router-dom"
import ROUTER from "src/router"

function NotFound() {
  return (
    <Result
      status="404"
      title="404 NotFound"
      subTitle="Xin lỗi, Trang web bạn đang tìm kiếm không tồn tại."
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
}
export default NotFound
