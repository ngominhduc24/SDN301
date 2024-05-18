import { menuItem } from "./MenuItem"
import { useLocation, useNavigate } from "react-router-dom"
import { LayoutAdminStyled } from "./styled"
import { Col, Menu, Row } from "antd"
import { useDispatch } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { useState } from "react"
import LstIcons from "src/components/ListIcons"
import socket from "src/utils/socket"
import MainHeader from "src/components/Header"

const LayoutAdmin = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    navigate('/login')
  }

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout()
    }
  }

  return (
    <LayoutAdminStyled>
      <MainHeader />
      <Row >
        <Col span={collapsed ? 2 : 4}>
          <div
            className="menu-container"
            style={{
              width: collapsed ? "90px" : "100%"
            }}
          >
            <Menu
              inlineCollapsed={collapsed}
              mode="inline"
              onClick={e => handleChangeMenu(e.key)}
              items={menuItem()}
              selectedKeys={location?.pathname}
            />
            <div
              className="collapsed-menu cursor-pointer d-flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <div className="mr-8">
                {collapsed ? LstIcons.ICON_MENUUNFOLD : LstIcons.ICON_MENUFOLD}
              </div>
              {/* <p style={{ display: collapsed ? "none" : "block" }}>Collapsed</p> */}
            </div>
          </div>
        </Col>
        <Col span={collapsed ? 22 : 20}>
          <div className="content-container">
            {children}
          </div>
        </Col>
      </Row>
    </LayoutAdminStyled >
  )
}

export default LayoutAdmin