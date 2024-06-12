import { Row, Col, Menu } from "antd"
import { AdminMenuStyled } from "./styled"
import { useLocation, useNavigate } from "react-router-dom"
import { UserMenuStyled } from "../LayoutUser/styled"
import { useState } from "react"
import { DoubleLeftOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import LayoutBackgroundCommon from "src/components/Common/Layout/LayoutBackgroundCommon"

const LayoutAdmin = ({
  collapseMenu,
  setCollapseMenu,
  children,
  selectedKey,
  menuAdmin,
}) => {
  const navigate = useNavigate()
  const [themeDark, setThemeDark] = useState(false)
  const location = useLocation()
  const onChange = menu => {
    !menu?.key?.includes("subkey") &&
      navigate(menu?.key?.replace("submenu", ""))
  }
  useEffect(() => {
    document
      .getElementById("body-admin-scroll")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [location?.pathname])

  return (
    <Row gutter={20} style={{ flexWrap: "nowrap" }}>
      <Col style={{ marginLeft: -17, paddingLeft: "0px" }}>
        <UserMenuStyled
          themeDark={themeDark}
          collapseMenu={collapseMenu}
          style={{ top: 60, height: "calc(100vh - 60px)" }}
        >
          <div
            className={`side-bar-wrapper d-flex flex-column justify-content-space-between`}
          >
            <Menu
              onClick={onChange}
              selectedKeys={selectedKey}
              mode="inline"
              defaultOpenKeys={[
                "subkey1",
                "subkey2",
                "subkey3",
                "subkey4",
                "subkey5",
                "subkey6",
              ]}
              items={menuAdmin}
              // className="menu-antd-admin"
              className="menu-antd-user pt-5"
              theme={themeDark ? "dark" : "light"}
              inlineCollapsed={collapseMenu}
            />
            {/* <div
              className="collapsed-item"
              onClick={() => setCollapseMenu(!collapseMenu)}
            >
              <div className="collapsed-icon">
                <DoubleLeftOutlined rotate={collapseMenu ? 180 : 0} />
              </div>
              <div className="collapsed-title">Thu gọn</div>
            </div> */}
          </div>
        </UserMenuStyled>
      </Col>
      <Col
        flex="auto"
        className="pt-12 pr-24"
        style={{
          width: 0,
          height: "calc(100vh - 50px)",
          overflowY: "auto",
        }}
        id="body-admin-scroll"
      >
        {children}
      </Col>
    </Row>
  )
}

export default LayoutAdmin

